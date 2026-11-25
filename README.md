# The Excuse That Almost Works

[![Competition](https://make.fun/badge/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5.svg)](https://make.fun/bounty/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5)
[![Rank](https://make.fun/badge/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5/prosky1/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5-entry/rank.svg)](https://make.fun/bounty/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5)
[![Reward](https://make.fun/badge/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5/prosky1/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5-entry/reward.svg)](https://make.fun/bounty/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5)

Entry for the [make.fun bounty "The Excuse That Almost Works"](https://make.fun/bounty/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5): the one line a gamer texts the boss to skip work on GTA 6 launch week.

## The excuse

> School sent my boy home with nits. Everything he owns is in the wash, and so am I.

One line, 82 characters, 18 words — a real, specific, boring detail (a kid sent home with nits, a load of laundry) rather than a wild story, written the way a person types in a hurry.

## How it works

`main.ts` (Node 22.18+) writes the excuse verbatim to `/output/entry.txt` and verifies the result byte-for-byte before exiting. It guards the text against silent drift: 1–140 characters, 1–140 bytes, at most 20 words, a single line, and every word checked in order against the approved text.

```sh
node main.ts
cat /output/entry.txt
```

## License

MIT — see [LICENSE](LICENSE).
