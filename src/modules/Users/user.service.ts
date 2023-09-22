import PaginationHelper, { ResultInterface } from "../../utils/pagination";
import { models } from "../../utils/database";
import { User } from "./user.interface";
import { HttpException } from "../../exceptions/HttpException";
import { isEmpty } from "../../utils/isEpmty";
import { UpdateUserDto } from "./user.dto";

class UserService {
  public user = models.User;

  public async getAllUsers(
    page: number,
    pageSize: number
  ): Promise<ResultInterface> {
    const paginationHelper = new PaginationHelper(this.user);
    const result = await paginationHelper.paginate(page, pageSize);
    return result;
  }

  public async getUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "userId is empty");
    const user: User = await this.user.findByPk(userId);
    if (!user) throw new HttpException(400, "User not found");
    return user;
  }

  public async updateUserDetails(
    userId: string,
    userData: UpdateUserDto
  ): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");
    const user = await this.user.findByPk(userId);
    if (!user) throw new HttpException(409, "User doesn't exist");
    const updatedUser: User = await user.update(userData);
    return updatedUser;
  }
}

export default UserService;
