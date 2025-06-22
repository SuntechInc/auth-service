export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  status: string;
  type: string;
  accessLevels: string[];
  directPermissions: string[];
}
