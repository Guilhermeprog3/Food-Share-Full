import { NavigationContainer } from "@react-navigation/native";

import { FormProvider, useForm } from "react-hook-form";

import PublicRoutes from "./public.routes";
import ProtectedRoutes from "./protected.routes";

import { useAuth } from "@/hooks/useAuth";

export default function Routes() {
  const { user, isLoadingUserStorageData } = useAuth();
  const methods = useForm();

  return (
    <NavigationContainer>
      <FormProvider {...methods}>
        {user.id ? <ProtectedRoutes /> : <PublicRoutes />}
      </FormProvider>
    </NavigationContainer>
  );
}
