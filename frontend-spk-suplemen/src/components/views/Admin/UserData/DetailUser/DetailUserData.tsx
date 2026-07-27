import { IUser } from "@/types/User";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
} from "@heroui/react";
import useUserData from "./useUserData";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  dataUser?: IUser;
  onUpdate: (data: Partial<IUser>) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const DetailUserData = (props: PropTypes) => {
  const { dataUser, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useUserData();

  useEffect(() => {
    if (dataUser) {
      setValueUpdateInfo("fullName", dataUser.fullName || "");
      setValueUpdateInfo("username", dataUser.username || "");
      setValueUpdateInfo("email", dataUser.email || "");
      setValueUpdateInfo("role", dataUser.role || "");
    }
  }, [dataUser, setValueUpdateInfo]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo(); 
    }
  }, [isSuccessUpdate, resetUpdateInfo]);

  const inputClassNames = {
    inputWrapper:
      "bg-white border-slate-200 shadow-sm hover:border-blue-300 focus-within:!border-blue-500 focus-within:!ring-2 focus-within:!ring-blue-100 transition-all duration-300 rounded-xl h-12",
    label: "text-slate-700 font-medium pb-1",
  };

  return (
    <Card className="w-full bg-white rounded-3xl shadow-sm border border-slate-100 p-2 sm:p-6 lg:p-8">
      {/* --- CARD HEADER --- */}
      <CardHeader className="flex flex-col items-start gap-2 border-b border-slate-100 pb-6 mb-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">👤</span>
          <h1 className="text-2xl font-bold text-blue-700 tracking-tight">
            User Information
          </h1>
        </div>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Manage and update user credentials and access roles.
        </p>
      </CardHeader>

      {/* --- CARD BODY --- */}
      <CardBody className="pt-4 overflow-visible">
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          
          {/* --- SECTION 1: USER DETAILS --- */}
          <div className="flex flex-col gap-5 bg-blue-50/40 border border-slate-100 rounded-2xl p-5 sm:p-6">
            <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-2">
              Profile Details
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Skeleton isLoaded={!!dataUser?.fullName} className="w-full sm:w-1/2 rounded-xl">
                <Controller
                  name="fullName"
                  control={controlUpdateInfo}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Full Name"
                      variant="bordered"
                      labelPlacement="outside"
                      type="text"
                      isInvalid={errorsUpdateInfo.fullName !== undefined}
                      errorMessage={errorsUpdateInfo.fullName?.message}
                      classNames={inputClassNames}
                    />
                  )}
                />
              </Skeleton>

              <Skeleton isLoaded={!!dataUser?.username} className="w-full sm:w-1/2 rounded-xl">
                <Controller
                  name="username"
                  control={controlUpdateInfo}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Username"
                      variant="bordered"
                      labelPlacement="outside"
                      type="text"
                      isInvalid={errorsUpdateInfo.username !== undefined}
                      errorMessage={errorsUpdateInfo.username?.message}
                      classNames={inputClassNames}
                    />
                  )}
                />
              </Skeleton>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mt-2">
              <Skeleton isLoaded={!!dataUser?.email} className="w-full sm:w-1/2 rounded-xl">
                <Controller
                  name="email"
                  control={controlUpdateInfo}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Email Address"
                      variant="bordered"
                      labelPlacement="outside"
                      type="email"
                      isInvalid={errorsUpdateInfo.email !== undefined}
                      errorMessage={errorsUpdateInfo.email?.message}
                      classNames={inputClassNames}
                    />
                  )}
                />
              </Skeleton>

              <Skeleton isLoaded={!!dataUser?.role} className="w-full sm:w-1/2 rounded-xl">
                <Controller
                  name="role"
                  control={controlUpdateInfo}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="System Role (e.g., admin, user)"
                      variant="bordered"
                      labelPlacement="outside"
                      type="text"
                      isInvalid={errorsUpdateInfo.role !== undefined}
                      errorMessage={errorsUpdateInfo.role?.message}
                      classNames={inputClassNames}
                    />
                  )}
                />
              </Skeleton>
            </div>
          </div>

          {/* --- CARD FOOTER / ACTION BUTTON --- */}
          <div className="flex justify-end mt-2">
            <Button
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 rounded-xl px-10 h-12 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              type="submit"
              disabled={isPendingUpdate || !dataUser?.id}
            >
              {isPendingUpdate ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" color="white" />
                  <span>Saving Changes...</span>
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
          
        </form>
      </CardBody>
    </Card>
  );
};

export default DetailUserData;