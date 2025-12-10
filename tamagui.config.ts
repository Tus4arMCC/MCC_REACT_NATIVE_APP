import { config } from "@tamagui/config/v3";
import { createTamagui } from "tamagui";

export default createTamagui(config);

export type AppTamaguiConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppTamaguiConfig {}
}
