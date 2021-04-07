import { Component, OnInit } from '@angular/core';
import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { HttpService } from '../services/http.service';
import { ClubInterface, ClubMembersInterface } from './clubList.interface';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn | null;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-club-table',
  templateUrl: './club-table.component.html',
  styleUrls: ['./club-table.component.css'],
})
export class ClubTableComponent implements OnInit {
  clubList: ClubInterface[] = [];
  wholeJson: any = null;
  listOfColumns: ColumnItem[] = [];
  mapOfExpandedData: { [key: string]: ClubMembersInterface[] } = {};
  editId: any = null;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.setupTableProperties();
    this.callClubListService();
  }

  callClubListService() {
    this.httpService.getClubList()?.subscribe(
      (response) => {
        console.log(response);
        this.wholeJson = response[0];
        response.forEach((element:any) => {
              for (const key in element) {
                element[key].forEach((clubObj:any) => {
                  for (const iterator in clubObj) {
                    this.clubList.push(clubObj[iterator][0])
                  }     
            });
              }
        });
      },
      (error) => {
        console.log(error, 'Failed To Load Club List');
      },
      () => {
        console.log('Request Complete');
      }
    );
  }

  setupTableProperties() {
    this.listOfColumns = [
      {
        name: 'Name',
        sortOrder: null,
        sortFn: (a: ClubInterface, b: ClubInterface) =>
          a.club_name.localeCompare(b.club_name),
        sortDirections: ['ascend', 'descend', null],
      },
      {
        name: 'Address',
        sortOrder: null,
        sortFn: (a: ClubInterface, b: ClubInterface) =>
          a.club_address.localeCompare(b.club_address),
        sortDirections: ['ascend', 'descend', null],
      },
    ];
  }

  deleteRow(index: number) {
    this.clubList = this.clubList.filter((d, i) => i !== index);
  }

  startEdit(index: number) {
    this.editId = index;
  }

  stopEdit() {
    this.editId = null;
  }

  submitData() {
    const postJsonToBeSubmit = this.wholeJson;
    this.httpService.postClubList(postJsonToBeSubmit)?.subscribe(
      (response) => {
        alert('Submitted response: ' + JSON.stringify(response));
      },
      (error) => {},
      () => {
        console.log('Request Complete');
      }
    );
  }
}
