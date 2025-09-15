import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export const  AlertMessage = ({ typeAlert, titleMsg, descriptionMsg }: {typeAlert: string, titleMsg: string, descriptionMsg: string}) => {
    return (
        <Alert className="mb-[30px]">
            {
                typeAlert == "success" && (
                    <CheckCircle2Icon />
                )
            }
            {
                typeAlert == "warn" && (
                    <AlertCircleIcon />
                )
            }
            {
                typeAlert == "error" && (
                    <AlertCircleIcon />
                )
            }
            <AlertTitle>{titleMsg}</AlertTitle>
            <AlertDescription>
                {descriptionMsg}
            </AlertDescription>
        </Alert>
    )
}
