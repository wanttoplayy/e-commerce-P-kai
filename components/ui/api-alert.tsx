import { Server } from "lucide-react";
import { Alert } from "./alert";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const VariantMap: Record<ApiAlertProps["variant"], string> = {
  public: "Secondary",
  admin: "destructibve",
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  return (
    <Alert>
      <Server className="h-4 w-4" />
    </Alert>
  );
};
