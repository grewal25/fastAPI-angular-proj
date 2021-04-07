export interface ClubInterface {
  club_name: string;
  club_address: string;
  club_members: ClubMembersInterface[];
}

export interface ClubMembersInterface {
  name: string;
  age: number;
}
