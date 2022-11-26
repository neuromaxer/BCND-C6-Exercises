var Test = require("../config/testConfig.js");

contract("ExerciseC6A", async (accounts) => {
    var config;
    before("setup contract", async () => {
        config = await Test.Config(accounts);
    });

    it("contract owner can register new user", async () => {
        // ARRANGE
        let caller = accounts[0]; // This should be config.owner or accounts[0] for registering a new user
        let newUser = config.testAddresses[0];

        // ACT
        await config.exerciseC6A.registerUser(newUser, false, { from: caller });
        let result = await config.exerciseC6A.isUserRegistered.call(newUser);

        // ASSERT
        assert.equal(result, true, "Contract owner cannot register new user");

        config.exerciseC6A.UserProfiles;
    });

    it("operation status is changed when multi-party threshold is reached", async () => {
        let admin1 = accounts[1];
        let admin2 = accounts[2];

        await config.exerciseC6A.registerUser(admin1, true, {
            from: config.owner,
        });
        await config.exerciseC6A.registerUser(admin2, true, {
            from: config.owner,
        });

        let startStatus = await config.exerciseC6A.operational.call();
        let changeStatus = !startStatus;

        // ACT
        await config.exerciseC6A.setOperatingStatus(changeStatus, {
            from: admin1,
        });
        await config.exerciseC6A.setOperatingStatus(changeStatus, {
            from: admin2,
        });

        let newStatus = await config.exerciseC6A.operational.call();

        // ASSERT
        assert.equal(changeStatus, newStatus, "Multi-party call failed");
    });
});
