import { apiManager } from "@/lib/api/apiManager";
import { EmailErrorMessage, EmailErrorType } from "@/lib/constants";

export async function checkEmailDuplication(email) {
  try {
    const result = await apiManager.getEmailAvailable({ email });
    const available = result?.data?.available;

    if (available === false) {
      return {
        type: EmailErrorType.DUPLICATED,
        message: EmailErrorMessage.DUPLICATED,
      };
    }

    return null;
  } catch (error) {
    console.error(error);

    return {
      type: "NETWORK_ERROR",
      message: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}
