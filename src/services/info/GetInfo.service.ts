import packageJson from "../../../package.json";

class GetInfoService {
  execute() {
    const { name, description, version, author } = packageJson;
    return { name, description, author, version };
  }
}

export default new GetInfoService();
