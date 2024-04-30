import { getSession } from "@/actions/serverActions";
import { getDoc, doc } from "firebase/firestore";
import { redirect } from "next/navigation";
import UserProvider from "@/app/components/UserProvider";
import { db } from "@/firebase/firebase";

interface User {
  username: string;
  privateKey: string;
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  const session = await getSession(String(params?.username));
  if (session === "session-expired") {
    redirect("/auth/signin");
  }

  const user: User = JSON.parse(String(session));
  const decryptedPrivateKey = (
    await getDoc(doc(db, "users", user.username))
  ).data()?.privateKey;
  user.privateKey = decryptedPrivateKey;

  return <UserProvider user={user}>{children}</UserProvider>;
}
