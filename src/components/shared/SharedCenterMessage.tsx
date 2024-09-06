import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type TSharedCenterMessage = {
  message: string;
};

const SharedCenterMessage = ({ message }: TSharedCenterMessage) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
      </CardHeader>
      <CardContent>
        <p className="text-center">{message}</p>
      </CardContent>
    </Card>
  );
};

export default SharedCenterMessage;
