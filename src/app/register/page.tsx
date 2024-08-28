import RegisterForm from "@/components/register/RegisterForm";
import { getAllCountries } from "@/lib/actions/shared/xata/CountriesActions";

const RegisterPage = async () => {
  const countries = await getAllCountries();
  return (
    <RegisterForm countries={countries}/>
  );
};

export default RegisterPage;
