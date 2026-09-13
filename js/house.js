const SITE = {
  name: "batonhouse",
  symbol: "batonhouse",
  mint: "",
  x: "https://x.com/batonhousesol",
  pumpHome: "https://pump.fun",
  pumpCoin: "https://pump.fun/coin/",
  swapHome: "https://swap.pump.fun/",
  swapOut: "https://swap.pump.fun/?output=",
  dexHome: "https://dexscreener.com/solana",
  dexToken: "https://dexscreener.com/solana/",
  phantom: "https://phantom.app/",
  embedQuery:
    "?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartLeftToolbar=0&chartDefaultOnMobile=1&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15",
};

const $ = (id) => document.getElementById(id);

function tokenLinks() {
  const minted = Boolean(SITE.mint);
  return {
    buy: minted ? SITE.swapOut + SITE.mint : SITE.swapHome,
    pump: minted ? SITE.pumpCoin + SITE.mint : SITE.pumpHome,
    dex: minted ? SITE.dexToken + SITE.mint : SITE.dexHome,
    embed: minted
      ? SITE.dexToken + SITE.mint + SITE.embedQuery
      : SITE.dexHome + SITE.embedQuery,
    ca: minted ? SITE.mint : "TBA",
  };
}

function wireLinks() {
  const links = tokenLinks();
  document.querySelectorAll("[data-link]").forEach((node) => {
    const kind = node.getAttribute("data-link");
    if (kind === "buy") node.href = links.buy;
    if (kind === "pump") node.href = links.pump;
    if (kind === "dex") node.href = links.dex;
    if (kind === "x") node.href = SITE.x;
    if (kind === "phantom") node.href = SITE.phantom;
  });

  const embed = $("dex-embed");
  if (embed) embed.src = links.embed;

  document.querySelectorAll("[data-ca]").forEach((node) => {
    node.textContent = links.ca;
  });
}

function toast(message) {
  const node = $("toast");
  if (!node) return;
  node.textContent = message;
  node.classList.add("is-on");
  window.setTimeout(() => node.classList.remove("is-on"), 1800);
}

function copyCa() {
  const text = tokenLinks().ca;
  if (text === "TBA") {
    toast("Contract address arrives after launch");
    return;
  }
  navigator.clipboard.writeText(text).then(
    () => toast("Contract copied to clipboard"),
    () => toast("Copy failed")
  );
}

function spawnWindowLights() {
  const field = $("window-field");
  if (!field) return;
  for (let i = 0; i < 28; i += 1) {
    const lamp = document.createElement("span");
    lamp.className = "sill-light";
    lamp.style.left = `${4 + Math.random() * 92}%`;
    lamp.style.top = `${18 + Math.random() * 62}%`;
    lamp.style.animationDuration = `${2.4 + Math.random() * 3.8}s`;
    lamp.style.animationDelay = `${-Math.random() * 4}s`;
    lamp.style.setProperty("--glow", `${1.2 + Math.random() * 1.8}`);
    field.appendChild(lamp);
  }
}

function spawnSwirls() {
  const field = $("swirl-field");
  if (!field) return;
  for (let i = 0; i < 7; i += 1) {
    const swirl = document.createElement("span");
    swirl.className = "baton-swirl";
    swirl.style.top = `${12 + Math.random() * 70}%`;
    swirl.style.left = `${Math.random() * 100}%`;
    swirl.style.animationDuration = `${16 + Math.random() * 14}s`;
    swirl.style.animationDelay = `${-Math.random() * 18}s`;
    swirl.style.setProperty("--arc", `${40 + Math.random() * 80}px`);
    field.appendChild(swirl);
  }
}

function spawnSmoke() {
  const field = $("smoke-field");
  if (!field) return;
  const stacks = [
    { left: "12%", delay: "0s" },
    { left: "38%", delay: "-4s" },
    { left: "67%", delay: "-8s" },
    { left: "86%", delay: "-2s" },
  ];
  stacks.forEach((stack) => {
    const puff = document.createElement("span");
    puff.className = "chimney-smoke";
    puff.style.left = stack.left;
    puff.style.animationDelay = stack.delay;
    field.appendChild(puff);
  });
}

function revealOnScroll() {
  const nodes = document.querySelectorAll("[data-reveal]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-shown");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );
  nodes.forEach((node) => observer.observe(node));
}

function compactMailbox() {
  const mailbox = $("mailbox");
  if (!mailbox) return;
  const apply = () => {
    mailbox.classList.toggle("is-compact", window.scrollY > 48);
  };
  apply();
  window.addEventListener("scroll", apply, { passive: true });
}

function parallaxDusk() {
  const layer = $("skyline");
  const glow = $("horizon-glow");
  if (!layer) return;
  window.addEventListener(
    "pointermove",
    (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * 10;
      layer.style.transform = `translate3d(${x}px, ${8 + y}px, 0)`;
      if (glow) {
        glow.style.transform = `translate3d(${x * 0.4}px, ${y * 0.3}px, 0)`;
      }
    },
    { passive: true }
  );
}

function lightWalkway() {
  const stones = document.querySelectorAll(".stoop-step");
  if (!stones.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          stones.forEach((stone, index) => {
            window.setTimeout(() => stone.classList.add("is-lit"), index * 180);
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  observer.observe(stones[0].parentElement);
}

function setYear() {
  const node = $("year");
  if (node) node.textContent = String(new Date().getFullYear());
}

function wireActions() {
  document.querySelectorAll("[data-copy-ca]").forEach((node) => {
    node.addEventListener("click", copyCa);
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      const target = id ? document.querySelector(id) : null;
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  wireLinks();
  wireActions();
  spawnWindowLights();
  spawnSwirls();
  spawnSmoke();
  revealOnScroll();
  compactMailbox();
  parallaxDusk();
  lightWalkway();
  setYear();
});
