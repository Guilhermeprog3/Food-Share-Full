import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardHistList } from "../card_history";

type CardProps = React.ComponentProps<typeof Card>;

export function List_history({ className, ...props }: CardProps) {
  return (
    <div className="flex justify-center ">
      <Card className={cn("w-full p-6 rounded-lg shadow-xl border border-gray-200", className)} {...props}>
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-center text-2xl font-bold">Historico de Doações</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 mt-4">
          <div className="flex items-center justify-center">
            <CardHistList />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center mt-4">
          <p className="text-xs text-gray-500">Historico de Doações realizadas</p>
        </CardFooter>
      </Card>
    </div>
  );
}
