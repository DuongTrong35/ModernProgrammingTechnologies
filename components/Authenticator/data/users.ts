export interface UserAccount {
  phone: string;
  password: string;
  name?: string;
  email?: string;
}

export const SAMPLE_USERS: UserAccount[] = [
  {
    phone: "0901234567",
    password: "123456",
    name: "Nguyễn Văn An",
    email: "an@gmail.com",
  },
  {
    phone: "0912345678",
    password: "123456",
    name: "Trần Minh Khang",
    email: "khang@gmail.com",
  },
];