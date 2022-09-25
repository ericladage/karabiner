import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
        },
        to: [
          {
            key_code: "left_shift",
            modifiers: ["left_command", "left_control", "left_option"],
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
      {
        type: "basic",
        description: "Up Arrow",
        from: {
          key_code: "i",
          modifiers: {
            mandatory: [
              "left_shift",
              "left_command",
              "left_control",
              "left_option",
            ],
          },
        },
        to: [
          {
            key_code: "up_arrow",
          },
        ],
      },
      {
        type: "basic",
        description: "Down Arrow",
        from: {
          key_code: "k",
          modifiers: {
            mandatory: [
              "left_shift",
              "left_command",
              "left_control",
              "left_option",
            ],
          },
        },
        to: [
          {
            key_code: "down_arrow",
          },
        ],
      },
      {
        type: "basic",
        description: "Left Arrow",
        from: {
          key_code: "j",
          modifiers: {
            mandatory: [
              "left_shift",
              "left_command",
              "left_control",
              "left_option",
            ],
          },
        },
        to: [
          {
            key_code: "left_arrow",
          },
        ],
      },
      {
        type: "basic",
        description: "Right Arrow",
        from: {
          key_code: "l",
          modifiers: {
            mandatory: [
              "left_shift",
              "left_command",
              "left_control",
              "left_option",
            ],
          },
        },
        to: [
          {
            key_code: "right_arrow",
          },
        ],
      },
      {
        type: "basic",
        description: "Right Arrow",
        from: {
          key_code: "l",
          modifiers: {
            mandatory: [
              "left_shift",
              "left_command",
              "left_control",
              "left_option",
            ],
          },
        },
        to: [
          {
            key_code: "right_arrow",
          },
        ],
      },
      {
        type: "basic",
        description: "Page Down",
        from: {
          key_code: "o",
          modifiers: {
            mandatory: [
              "left_shift",
              "left_command",
              "left_control",
              "left_option",
            ],
          },
        },
        to: [
          {
            key_code: "page_down",
          },
        ],
      },
      {
        type: "basic",
        description: "Page Up",
        from: {
          key_code: "u",
          modifiers: {
            mandatory: [
              "left_shift",
              "left_command",
              "left_control",
              "left_option",
            ],
          },
        },
        to: [
          {
            key_code: "page_up",
          },
        ],
      },
      {
        type: "basic",
        description: "Disable CMD + Tab to force Hyper Key usage",
        from: {
          key_code: "tab",
          modifiers: {
            mandatory: ["left_command"],
          },
        },
        to: [
          {
            key_code: "tab",
          },
        ],
      },
    ],
  },
  ...createHyperSubLayers({
    // o = "Open" applications
    p: {
      g: app("Google Chrome"),
      v: app("Visual Studio Code"),
      d: app("Discord"),
      f: app("Figma"),
      s: app("Slack"),
      n: app("Notion"),
      t: app("iTerm2"),
      m: app("Apple Music"),
    },

    // w = "Window" via rectangle.app
    w: {
      h: {
        description: "Window: First Third",
        to: [
          {
            key_code: "left_arrow",
            modifiers: ["right_option", "right_control"],
          },
        ],
      },
      l: {
        description: "Window: Last Third",
        to: [
          {
            key_code: "right_arrow",
            modifiers: ["right_option", "right_control"],
          },
        ],
      },
      y: {
        description: "Window: Left Half",
        to: [
          {
            key_code: "left_arrow",
            modifiers: ["right_option", "right_command"],
          },
        ],
      },
      o: {
        description: "Window: Right Half",
        to: [
          {
            key_code: "right_arrow",
            modifiers: ["right_option", "right_command"],
          },
        ],
      },
      f: {
        description: "Window: Full Screen",
        to: [
          {
            key_code: "f",
            modifiers: ["right_option", "right_command"],
          },
        ],
      },
      u: {
        description: "Window: Previous Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control", "right_shift"],
          },
        ],
      },
      i: {
        description: "Window: Next Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control"],
          },
        ],
      },
    },

    // s = "System"
    s: {
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      semicolon: {
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },
      e: {
        to: [
          {
            // Emoji picker
            key_code: "spacebar",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
