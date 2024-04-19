import { toast } from "sonner";

export default function useNotification() {
  const showMessage = ({ type = "success", value }) => {
    switch (type) {
      case "success":
        toast.success(value);
        return;
      case "error":
        toast.error(value);
        return;
      default:
        toast.success(value);
        return;
    }
  };

  return { showMessage };
}
