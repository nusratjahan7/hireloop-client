import SigninForm from "./SigninForm";

export default async function SignInPage({ searchParams }) {
    const params = await searchParams;
    const redirectTo = params?.redirect || "/";
    return <SigninForm redirectTo={redirectTo} />;
}