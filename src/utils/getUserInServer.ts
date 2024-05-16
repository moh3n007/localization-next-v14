import { UserProps } from "@interfaces/general";

export default async function getUserInServer(userId: string) {
  const user = (await fetch(
    `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/collections/users/records/${userId}`,
    {
      cache: "no-cache",
      headers: {
        x_id: userId,
      },
    }
  ).then((data) => data.json())) as UserProps;

  return user;
}
