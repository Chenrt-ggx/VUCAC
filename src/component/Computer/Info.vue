<template>
    <div>
        <el-row justify="center">
            <el-col :span="12">
                <el-card class="info-text-card">
                    <div
                        v-for="(i, index) in infoText"
                        :key="i"
                        class="info-text-container"
                    >
                        <div class="info-text-title">
                            {{ i["title"] }}
                        </div>
                        <div
                            v-for="j in i['param']"
                            :key="j"
                            class="info-text-content"
                        >
                            <span
                                v-for="(k, count) in j['text'].split(
                                    '<replace-href>'
                                )"
                                :key="k"
                            >
                                <a
                                    v-if="count !== 0"
                                    class="info-inline-href"
                                    :href="j['hrefs'][count - 1]['link']"
                                >
                                    {{ j["hrefs"][count - 1]["name"] }}
                                </a>
                                {{ k }}
                            </span>
                        </div>
                        <el-divider
                            class="info-divider"
                            v-if="index + 1 !== infoText.length"
                        ></el-divider>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
body {
    margin: 0%;
    padding: 0%;
    height: 100%;
    font-size: 0%;
    line-height: 0%;
}

.info-text-card {
    margin-top: 45px;
}

.info-text-container {
    margin: 10px;
}

.info-text-title {
    font-size: 28px;
    color: #363636;
    margin-top: 20px;
    margin-bottom: 8px;
}

.info-text-content {
    font-size: 16px;
    color: #363636;
    line-height: 26px;
    margin-bottom: 16px;
    text-align: justify;
}

.info-inline-href:link {
    color: #061178;
}

.info-inline-href:visited {
    color: #22075e;
}

.info-inline-href:hover {
    color: #237804;
}

.info-inline-href:active {
    color: #061178;
}

.info-divider {
    margin-top: 32px;
    margin-bottom: 32px;
}
</style>

<script>
import Settings from "../../settings.json";

export default {
    data() {
        return {
            infoText: Settings["infoText"],
        };
    },
};
</script>
