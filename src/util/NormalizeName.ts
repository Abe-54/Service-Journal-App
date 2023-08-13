import { Client } from "../types/Client";

export default function normalizeName(client: Client) {
  if (!client || !client.client_name) {
    return "No client name";
  }

  const initialName = client.client_name.replace(",", "").split(" ");
  const lastName = initialName.shift();
  const firstName = initialName.join(" ");
  const fullName = `${firstName} ${lastName}`;
  return fullName;
}
