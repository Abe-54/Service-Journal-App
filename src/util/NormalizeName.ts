import { Client } from "../interfaces/Client";

export default function normalizeName(client: Client) {
    const initialName = client?.client_name.replace(",", "").split(" ");
    const lastName = initialName?.shift();
    const firstName = initialName?.join(" ");
    const fullName = `${firstName} ${lastName}`;
    return fullName;
}
  