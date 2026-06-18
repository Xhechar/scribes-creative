import Link from "next/link";
import { Flex, Text, Button } from "@radix-ui/themes";
import { WrenchOff } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center h-full mt-5">
      <Flex direction="column" gap="4" align="center" content="center">
        <Text size="8" weight="bold">
          Scribes Creative Solutions
        </Text>
        <Link href="/users" className="tooltip tooltip-left" data-tip="View Services">
          <Button size="3" variant="soft">
            <WrenchOff size={16} />
            Services
          </Button>
        </Link>
      </Flex>
    </div>
  );
}
