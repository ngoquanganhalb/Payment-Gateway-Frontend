import { LoginDto } from "@/dtos/LoginDto";
import { BaseService } from "./base.service";
import { SignUpDto } from "@/dtos/SignUpDto";
import { UserProfileDto } from "@/dtos/UserProfileDto";

class AuthService extends BaseService {
  constructor() {
    super("/auth");
  }

  public async login({ username, password }: LoginDto) {
    try {
      const response = await this.post("/login", { username, password });
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  public async signup({ username, password }: SignUpDto) {
    try {
      const response = await this.post("/register", { username, password });
      return response.data;
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  }

  public async logout() {
    try {
      await this.post("/logout");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  }

  public async refreshToken(refreshToken: string) {
    try {
      const response = await this.post("/refresh", { refreshToken });
      return response.data;
    } catch (error) {
      console.error("Token refresh failed:", error);
      throw error;
    }
  }

  public async getMe(): Promise<UserProfileDto> {
    try {
      const response = await this.get("/me");
      return response.data;
    } catch (error) {
      console.error("Get user info failed:", error);
      throw error;
    }
  }
}

export const authService = new AuthService();
