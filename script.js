/*
    Dependencies: floating.js (for nalu cans)
    https://animate.style/ for animations
*/

floating({
    content: '<img src="images/nalucan2.png" class="can" />',
    number: 20,
    duration: 15,
});

floating({
    content: '<img src="images/nalucan3.png" class"can" />',
    number: 12,
    duration: 8,
});

floating({
    content: '<img src="images/nalucan.png" class="can" />',
    number: 13,
    direction: "reverse",
    size: [1, 10],
});

function canFestival() {
    $(".float-container").show();
    setTimeout(function () {
        $(".float-container").fadeOut(2000);
    }, 5000);
}

function playSound(prefix, randomSuffix, randomMax) {
    let suffix = "";
    if (randomSuffix) {
        suffix = (Math.floor(Math.random() * randomMax) + 1).toString();
    }
    const audio = new Audio("sounds/" + prefix + suffix + ".wav");
    audio.play();
}

function animateElement(className, animation, time) {
    const item = document.querySelector(className);
    item.style.setProperty("display", "block");
    item.style.setProperty("--animate-duration", time.toString() + "s");
    item.classList.add("animate__animated", "animate__" + animation);
    item.addEventListener("animationend", () => {
        item.style.setProperty("display", "none");
    });
}

const pubnub = new PubNub({
    subscribeKey: "sub-c-7fffa620-1201-11eb-bc34-ce6fd967af95",
    uuid: "myUniqueUUID",
});

pubnub.subscribe({
    channels: ["lights"],
    message: function (m) {
        console.log(m);
    },
    error: function (error) {
        console.log(JSON.stringify(error));
    },
});

pubnub.addListener({
    status: function (statusEvent) {
        if (statusEvent.category === "PNConnectedCategory") {
        }
    },
    message: function (msg) {
        const text = msg && msg.message && msg.message.text;
        switch (text) {
            case "cmd:nalu":
                canFestival();
                playSound("nalu", true, 15);
                break;
            case "cmd:pogchamp":
                animateElement(".pog", "bounceOutLeft", 2);
                playSound("pog", false, 0);
                break;
            default:
                break;
        }
    },
    presence: function (presenceEvent) {},
});
