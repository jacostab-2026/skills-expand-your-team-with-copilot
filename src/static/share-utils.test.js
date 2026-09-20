const test = require("node:test");
const assert = require("node:assert/strict");
const {
  getInitialSharedActivity,
  getActivityShareUrl,
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
