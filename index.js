const mongoose = require("mongoose");
const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

// DB Models (you might want to move this into separate files)
const districtSchema = new mongoose.Schema({
    NAME: String,
    BBS_CODE: String,
    DIVISION_BBS_CODE: String,
});
const upazilaSchema = new mongoose.Schema({
    NAME: String,
    BBS_CODE: String,
    DISTRICT_BBS_CODE: String,
});

const District = mongoose.model("District", districtSchema, "districts");
const Upazila = mongoose.model("Upazila", upazilaSchema, "upazilas");

const MONGO_URI = "mongodb://127.0.0.1:27017/geolocation"; // change this
const OUTPUT_FILE = "mouzas.json";
const BEARER_TOKEN = process.env.BEARER_TOKEN; // store your token in .env

const fetchMouzas = async () => {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const districts = await District.find({});
    console.log("districts", districts?.length);
    const upozilas = await Upazila.find({});

    console.log("upozilas: ", upozilas?.length);

    const mouzaData = [];



    for (const district of districts) {
        for (const upz of upozilas.filter(
            (u) => u.DISTRICT_BBS_CODE === district.BBS_CODE
        )) {
            const url = `https://gateway.dlrms.land.gov.bd/core-api/api/public/mouzas/jl-numbers?DISTRICT_BBS_CODE=${district.BBS_CODE}&UPAZILA_BBS_CODE=${upz.BBS_CODE}`;

            try {
                const res = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer mQ23BpIHHJywZAbvHyoMyHD9ZFo1VoeF`, // ! PASTE TOKEN
                    },
                });

                if (res.data?.data?.length) {
                    mouzaData.push(...res?.data?.data)

                    console.log(
                        `✅ Success: ${district.NAME_EN} > ${upz.NAME_EN} fetched.`
                    );
                } else {
                    console.log(
                        `⚠️ No mouzas for ${district.NAME_EN} > ${upz.NAME_EN}`
                    );
                }
            } catch (err) {
                console.error(
                    `❌ Error fetching ${district.NAME_EN} > ${upz.NAME_EN}:`,
                    err.message
                );
            }
        }
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(mouzaData, null, 2));
    console.log(`🎉 Done! Data written to ${OUTPUT_FILE}`);

    mongoose.disconnect();
};

fetchMouzas();
