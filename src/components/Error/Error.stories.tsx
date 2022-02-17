import type { ComponentStoryObj } from "@storybook/react";
import { Error } from "./Error";

type Story = ComponentStoryObj<typeof Error>;

export default { component: Error };

export const Default: Story = {
  args: { error: "エラー" },
};
