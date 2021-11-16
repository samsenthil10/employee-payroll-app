import config from "../config/config";
import AxiosService from './AxiosService'

export default class EmployeePayrollService {
  baseUrl = config.baseUrl;
  addEmployee(data) {
    console.log(data)
    return AxiosService.postService(`${this.baseUrl}employeepayrollservice/create/`, data);
  }
  getAllEmployee() {
    return AxiosService.getService(`${this.baseUrl}employeepayrollservice`);

  }
  updateEmployee(id,data) {
    return AxiosService.putService(`${this.baseUrl}employeepayrollservice/update/${id}`, data);
  }
  getEmployee(id) {
    return AxiosService.getService(`${this.baseUrl}employeepayrollservice/get/${id}`);

  }
  deleteEmployee(id) {
    return AxiosService.deleteService(`${this.baseUrl}employeepayrollservice/delete/${id}`);
  }
  getAllEmployeeByDepartment(department)
    {
        return   AxiosService.getService(`${this.baseUrl}employeepayrollservice/department/${department}`);

    }
}