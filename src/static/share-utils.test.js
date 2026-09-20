const test = require("node:test");
const assert = require("node:assert/strict");
const {
  getInitialSharedActivity,
  getActivityShareUrl,
  shareActivityLink,
} = require("./share-utils.js");

test("getInitialSharedActivity reads the activity query parameter", () => {
  assert.deepEqual(getInitialSharedActivity("?activity=Robotics%20Club"), {
    sharedActivityName: "Robotics Club",
    searchQuery: "Robotics Club",
  });
});

test("getInitialSharedActivity returns empty values without a shared activity", () => {
  assert.deepEqual(getInitialSharedActivity("?day=Monday"), {
    sharedActivityName: "",
    searchQuery: "",
  });
});

test("getActivityShareUrl preserves existing query parameters", () => {
  assert.equal(
    getActivityShareUrl(
      "https://example.com/static/index.html?day=Monday&category=technology",
      "Robotics Club"
    ),
    "https://example.com/static/index.html?day=Monday&category=technology&activity=Robotics+Club"
  );
});

test("shareActivityLink uses Web Share when the payload is supported", async () => {
  let copiedUrl = "";
  let sharedPayload = null;
  const shareData = { url: "https://example.com/static/index.html?activity=Robotics+Club" };

  const result = await shareActivityLink(shareData, {
    navigatorObject: {
      canShare(payload) {
        return payload.url === shareData.url;
      },
      async share(payload) {
        sharedPayload = payload;
      },
    },
    async copyText(url) {
      copiedUrl = url;
    },
  });

  assert.equal(result, "shared");
  assert.deepEqual(sharedPayload, shareData);
  assert.equal(copiedUrl, "");
});

test("shareActivityLink falls back to copying when Web Share is unsupported", async () => {
  let copiedUrl = "";

  const result = await shareActivityLink(
    { url: "https://example.com/static/index.html?activity=Robotics+Club" },
    {
      navigatorObject: {
        canShare() {
          return false;
        },
        async share() {
          throw new Error("share should not be called");
        },
      },
      async copyText(url) {
        copiedUrl = url;
      },
    }
  );

  assert.equal(result, "copied");
  assert.equal(
    copiedUrl,
    "https://example.com/static/index.html?activity=Robotics+Club"
  );
});
