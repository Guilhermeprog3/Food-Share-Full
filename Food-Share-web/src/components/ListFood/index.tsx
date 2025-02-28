import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CardDemoList } from "../CardList/index";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

type CardProps = React.ComponentProps<typeof Card>;

export function CardDemo({ className, ...props }: CardProps) {

  function handlecreate() {
    redirect('/aliments_create');
  }

  return (
    <div className="flex justify-center mt-8">
      <Card className={cn("w-[1000px] p-6 rounded-lg shadow-xl border border-gray-200", className)} {...props}>
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-center text-2xl font-bold">LISTA DE ALIMENTOS</CardTitle>
          <Button className="bg-primary text-primary-foreground py-2 px-6 rounded-lg hover:bg-orange-200" onClick={handlecreate}>
            Cadastrar
          </Button>
        </CardHeader>
        <CardContent className="grid gap-6 mt-4">
          <div className="flex items-center justify-center">
            <CardDemoList />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center mt-4">
          <p className="text-xs text-gray-500">Gerencie seus alimentos cadastrados</p>
        </CardFooter>
      </Card>
    </div>
  );
}
