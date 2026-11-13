// Prints the spring presets as CSS custom properties for src/tokens/motion.css.
import { spring, SPRINGS } from "../src/motion/spring.js";

for (const [name, preset] of Object.entries(SPRINGS)) {
  const { easing, duration } = spring(preset);
  const suffix = name === "liquid" ? "" : `-${name}`;
  console.log(`  --x-spring${suffix}: ${easing};`);
  console.log(`  --x-spring${suffix}-duration: ${duration}ms;`);
}
