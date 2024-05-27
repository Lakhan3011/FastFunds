"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { useRouter } from "next/navigation";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const router = useRouter();
  return (
    <div className="mt-4">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              label="Number"
              placeholder="Number"
              onChange={(value) => {
                setNumber(value);
              }}
            />
            <TextInput
              label="Amount"
              placeholder="Amount"
              onChange={(value) => {
                setAmount(value);
              }}
            />
            <div className="pt-4 flex justify-center">
              <Button
                onClick={async () => {
                  try {
                    const res = await p2pTransfer(number, Number(amount) * 100);
                    if (res) {
                      alert(res.message);
                    } else {
                      router.push("/transfer");
                      router.refresh();
                    }
                  } catch (error) {
                    alert("Insufficient Fund");
                  }
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
}
