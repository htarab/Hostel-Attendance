class Students {
  constructor(
    name,
    departmant,
    year,
    registerNum,
    block,
    roomNum,
    phoneNum,
    parentName,
    parentPhoneNum,
    password,
    confirmPassword
  ) {
    this.name = name;
    this.department = departmant;
    this.year = year;
    this.registerNum = registerNum;
    this.block = block;
    this.roomNum = roomNum;
    this.phoneNum = phoneNum;
    this.parentName = parentName;
    this.parentPhoneNum = parentPhoneNum;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}

export default Students;
