import fs from "node:fs/promises";
import zlib from "node:zlib";

const source = "/tmp/current-site.html";
const target = new URL("../public/assets/", import.meta.url);
const html = await fs.readFile(source, "utf8");
const manifestMatch = html.match(/<script type="__bundler\/manifest">([\s\S]*?)<\/script>/);
if (!manifestMatch) throw new Error("Bundled asset manifest not found");
const manifest = JSON.parse(manifestMatch[1]);

const files = {
  "7c7bd1dc-971c-479d-9c35-c6ab98a347f7": "logo-color.png",
  "c0490fb2-c288-4e99-959e-165873f01427": "logo-white.png",
  "e6aba473-7e39-400d-b6f7-7f3083b0aeeb": "favicon.png",
  "32118286-3c34-45a0-91e2-c78653c3a20a": "hero-aerial.jpg",
  "daf258c3-7456-4b0a-8174-81b39177ca4b": "reimagined-aerial.png",
  "8da8acbd-10bc-435a-9a9f-a0fe89a0e251": "current-aerial.jpg",
  "a539a7f1-c273-46a4-bef2-51244be2d2f9": "entrance-rendering.png",
  "15e670b5-bd06-43b0-84fb-fb981fe7226e": "river-texture.jpg",
  "01018c78-f114-4acf-9c49-45c68a34d9fe": "studio-3d.jpg",
  "b78f819c-2f29-4204-9541-65ae68312e83": "studio-2d.png",
  "b33c482c-ae33-4146-aa6b-5b2eda58e78b": "one-bedroom-3d.jpg",
  "306f11ad-f844-4b8f-8ae6-625e24bb2bf6": "one-bedroom-2d.png",
  "205d2982-8685-4a0e-8e4c-d728409bdacd": "two-bedroom-3d.jpg",
  "8a8817c3-4a8e-4cb4-bf38-e7d91441f255": "two-bedroom-2d.png",
  "fb2adc87-d417-4b7c-9af4-a01b2712a6f6": "two-bedroom-suite-3d.jpg",
  "699754a1-a37a-488d-aaeb-591e69f490c0": "two-bedroom-suite-2d.png",
  "6d9aba07-07c6-4736-8df9-511fd56d9de8": "kitchen-classic.jpg",
  "6d7f6d6f-f1dd-4314-b9ac-4b46e84a68d2": "kitchen-refreshed.jpg",
  "2490a8e3-998d-4af5-8219-543091954013": "bath-classic.jpg",
  "70228f32-3e33-4b8c-9894-b7bd053bf35e": "bath-refreshed.jpg",
  "a08bbdb3-c123-4a0d-8ca6-b36ed0cd1cc0": "dog-park.jpg",
  "88cfc521-a878-4d3e-8226-0ae6c808deea": "grille-gazebo.jpg",
  "584ad361-948e-44e5-b14e-78c6c714e06c": "bocce-courts.jpg",
  "d7dddba1-6d75-4699-a931-5cde87e2ea5c": "screening-room.jpg",
  "5053d523-509f-4e3b-8bc6-a0dd04972e04": "library-dining.jpg",
  "0df30a35-9fcb-4979-b5a8-318cd402cb81": "covered-parking.jpg",
  "244fa7b6-e062-499c-9bc2-b55c1f8d3cad": "downtown-peoria.jpg",
  "c914a709-3f2e-476e-9761-ea19759d23cd": "eastside-centre.jpg",
  "59288c7c-f2b2-4130-8277-96bd0adc1f68": "riverfront-levee.jpg",
  "8d4d5a86-b691-4e7c-8e2c-29334fe365e5": "grand-prairie.jpg",
  "33b7554b-358a-474f-9395-bddadab12f87": "peoria-airport.jpg",
};

await fs.mkdir(target, { recursive: true });
for (const [id, filename] of Object.entries(files)) {
  const entry = manifest[id];
  if (!entry) throw new Error(`Missing asset ${id}`);
  let bytes = Buffer.from(entry.data, "base64");
  if (entry.compressed) bytes = zlib.gunzipSync(bytes);
  await fs.writeFile(new URL(filename, target), bytes);
}

console.log(`Extracted ${Object.keys(files).length} original assets.`);
