import VueRouter from "vue-router";

const Home = resolve => {
	require.ensure(["@/pages/Home"], () => {
		resolve(require("@/pages/Home"));
	});
};

const Login = resolve => {
	import("@/pages/Platform/leying/login").then(data => {
		resolve(data);
	});
};


const FishGame = resolve => {
	import("../../src/pages/Platform/fish").then(data => {
		resolve(data);
	});
};

const HistoryXZ = resolve => {
	require.ensure(["@/pages/historyXZ"], () => {
		resolve(require("@/pages/historyXZ"));
	});
};
const Pk10 = resolve => {
	require.ensure(["@/pages/Games/pk10"], () => {
		resolve(require("@/pages/Games/pk10"));
	});
};
const Cqssc = resolve => {
	require.ensure(["@/pages/Games/cqssc"], () => {
		resolve(require("@/pages/Games/cqssc"));
	});
};
const MarkSix = resolve => {
	require.ensure(["@/pages/Games/markSix"], () => {
		resolve(require("@/pages/Games/markSix"));
	});
};
const Pcegg = resolve => {
	require.ensure(["@/pages/Games/pcEgg"], () => {
		resolve(require("@/pages/Games/pcEgg"));
	});
};
const LuckyAirship = resolve => {
	require.ensure(["@/pages/Games/luckyAirship"], () => {
		resolve(require("@/pages/Games/luckyAirship"));
	});
};
const HappyTen = resolve => {
	require.ensure(["@/pages/Games/happyTen"], () => {
		resolve(require("@/pages/Games/happyTen"));
	});
};
const LuckFarm = resolve => {
	require.ensure(["@/pages/Games/luckFarm"], () => {
		resolve(require("@/pages/Games/luckFarm"));
	});
};
const Jsks = resolve => {
	require.ensure(["@/pages/Games/jsks"], () => {
		resolve(require("@/pages/Games/jsks"));
	});
};
const Jlk3 = resolve => {
	require.ensure(["@/pages/Games/jlk3"], () => {
		resolve(require("@/pages/Games/jlk3"));
	});
};
const Roma = resolve => {
	require.ensure(["@/pages/Games/roma"], () => {
		resolve(require("@/pages/Games/roma"));
	});
};
const Jssc = resolve => {
	require.ensure(["@/pages/Games/jssc"], () => {
		resolve(require("@/pages/Games/jssc"));
	});
};
const Jsssc = resolve => {
	require.ensure(["@/pages/Games/jsssc"], () => {
		resolve(require("@/pages/Games/jsssc"));
	});
};
const Jslh = resolve => {
	require.ensure(["@/pages/Games/jslh"], () => {
		resolve(require("@/pages/Games/jslh"));
	});
};
const Race = resolve => {
	require.ensure(["@/pages/Games/race"], () => {
		resolve(require("@/pages/Games/race"));
	});
};
const Fucai3D = resolve => {
	require.ensure(["@/pages/Games/Fucai3D"], () => {
		resolve(require("@/pages/Games/Fucai3D"));
	});
};
const VeniceRowing = resolve => {
	require.ensure(["@/pages/Games/veniceRowing"], () => {
		resolve(require("@/pages/Games/veniceRowing"));
	});
};
const Bjkl8 = resolve => {
	require.ensure(["@/pages/Games/bjkl8"], () => {
		resolve(require("@/pages/Games/bjkl8"));
	});
};


const Ag = resolve => {
	require.ensure(["@/pages/platform/ag"], () => {
		resolve(require("@/pages/platform/ag"));
	});
};
const Agothers = resolve => {
	require.ensure(["@/pages/agothers"], () => {
		resolve(require("@/pages/agothers"));
	});
};

const LyAgGame = resolve => {
	require.ensure(["@/pages/Games/lyAgGame"], () => {
		resolve(require("@/pages/Games/lyAgGame"));
	});
};

const Rules = resolve => {
	require.ensure(["@/pages/rules"], () => {
		resolve(require("@/pages/rules"));
	});
};
const Aboutus = resolve => {
	require.ensure(["@/pages/aboutus"], () => {
		resolve(require("@/pages/aboutus"));
	});
};
const Faq = resolve => {
	require.ensure(["@/pages/faq"], () => {
		resolve(require("@/pages/faq"));
	});
};
const Agent = resolve => {
	require.ensure(["@/pages/agent"], () => {
		resolve(require("@/pages/agent"));
	});
};
const Mobile = resolve => {
	require.ensure(["@/pages/mobile"], () => {
		resolve(require("@/pages/mobile"));
	});
};
const Mg = resolve => {
	require.ensure(["@/pages/mg"], () => {
		resolve(require("@/pages/mg"));
	});
};
const Report = resolve => {
	require.ensure(["@/pages/report"], () => {
		resolve(require("@/pages/report"));
	});
};
const Result = resolve => {
	require.ensure(["@/pages/result"], () => {
		resolve(require("@/pages/result"));
	});
};
const History = resolve => {
	require.ensure(["@/pages/history"], () => {
		resolve(require("@/pages/history"));
	});
};
const Userset = resolve => {
	require.ensure(["@/pages/userset"], () => {
		resolve(require("@/pages/userset"));
	});
};
const Games = resolve => {
	require.ensure(["@/pages/Games"], () => {
		resolve(require("@/pages/Games"));
	});
};
const Promo = resolve => {
	require.ensure(["@/pages/promo/index"], () => {
		resolve(require("@/pages/promo/index"));
	});
};
const notice = resolve => {
	require.ensure(["@/pages/notice"], () => {
		resolve(require("@/pages/notice"));
	});
};
const Bonus = resolve => {
	require.ensure(["@/pages/bonus"], () => {
		resolve(require("@/pages/bonus"));
	});
};
const returnWater = resolve => {
	require.ensure(["@/pages/returnWater"], () => {
		resolve(require("@/pages/returnWater"));
	});
};
const NewYear = resolve => {
	require.ensure(["@/pages/newYear"], () => {
		resolve(require("@/pages/newYear"));
	});
};

const Addbank = resolve => {
	require.ensure(["@/pages/Payment/addbank"], () => {
		resolve(require("@/pages/Payment/addbank"));
	});
};
const Record = resolve => {
	require.ensure(["@/pages/Payment/record"], () => {
		resolve(require("@/pages/Payment/record"));
	});
};

const AccessList = resolve => {
	require.ensure(["@/pages/Payment/accessList"], () => {
		resolve(require("@/pages/Payment/accessList"));
	});
};

const AccessCp = resolve => {
	require.ensure(["@/pages/Payment/accessCp"], () => {
		resolve(require("@/pages/Payment/accessCp"));
	});
};

const Activity = resolve => {
	require.ensure(["@/pages/activity"], () => {
		resolve(require("@/pages/activity"));
	});
};
const Maintain = resolve => {
	require.ensure(["@/pages/maintain"], () => {
		resolve(require("@/pages/maintain"));
	});
};
const Docking = resolve => {
	require.ensure(["@/pages/docking"], () => {
		resolve(require("@/pages/docking"));
	});
};


const Test = resolve => {
	import("@/pages/test").then(data => {
		resolve(data);
	});
};

const ChessCardGame = resolve => {
	import("../../src/pages/chess-card.vue").then(data => {
		resolve(data);
	});
};

const SportBetting = resolve => {
	import("../../src/pages/Platform/sport").then(data => {
		resolve(data);
	});
};

const JumpPage = resolve => {
	import("../../src/components/JumpPage").then(data => {
		resolve(data);
	});
};
//Vue.use(Router)

export default new VueRouter({
	// mode:'history',
	routes: [
		{
			path: "/jumppage",
			component: JumpPage,
			name: "JumpPage"
		},
		{
			path: "/login",
			component: Login
		}, {
			path: "/test",
			component: Test
		},
		{
			path: "/docking",
			component: Docking,
			name: "docking"
		},
		{
			path: "/addActivity",
			component: Activity,
			name: "activity"
		},
		{
			path: "/maintain",
			component: Maintain,
			name: "maintain"
		},
		{
			path: "/Gamesfish",
			name: "Fishgame",
			component: FishGame
		},
		{
			path: "/Gamescard",
			name: "ChessCardGame",
			component: ChessCardGame
		},
		{
			path: "/Gamessport",
			name: "SportBetting",
			component: SportBetting
		},
		{
			path: "/rules",
			name: "Rules",
			component: Rules
		},
		{
			path: "/games",
			component: Games,
			children: [
				{
					path: "/Games/pk10",
					name: "Pk10",
					component: Pk10
				},
				{
					path: "/Games/cqssc",
					name: "Cqssc",
					component: Cqssc
				},
				{
					path: "/Games/markSix",
					name: "MarkSix",
					component: MarkSix
				},
				{
					path: "/Games/pcEgg",
					name: "Pcegg",
					component: Pcegg
				},
				{
					path: "/Games/luckyAirship",
					name: "LuckyAirship",
					component: LuckyAirship
				},
				{
					path: "/Games/veniceRowing",
					name: "VeniceRowing",
					component: VeniceRowing
				},
				{
					path: "/Games/happyTen",
					name: "HappyTen",
					component: HappyTen
				},
				{
					path: "/Games/luckFarm",
					name: "LuckFarm",
					component: LuckFarm
				},
				{
					path: "/Games/jsks",
					name: "Jsks",
					component: Jsks
				},
				{
					path: "/Games/jlk3",
					name: "Jlk3",
					component: Jlk3
				},
				{
					path: "/Games/roma",
					name: "Roma",
					component: Roma
				},
				{
					path: "/Games/jssc",
					name: "Jssc",
					component: Jssc
				},
				{
					path: "/Games/jsssc",
					name: "Jsssc",
					component: Jsssc
				},
				{
					path: "/Games/jslh",
					name: "Jslh",
					component: Jslh
				},
				{
					path: "/Games/race",
					name: "Race",
					component: Race
        },
        {
					path: "/Games/Fucai3D",
					name: "Fucai3D",
					component: Fucai3D
				},
				{
					path: "/Games/bjkl8",
					name: "Bjkl8",
					component: Bjkl8
				},
				{
					path: "/historyXZ",
					name: "HistoryXZ",
					component: HistoryXZ
				},
				{
					path: "/Payment/record:id",
					name: "Record",
					component: Record
				},
				{
					path: "/Payment/accessList",
					name: "AccessList",
					component: AccessList
				},
				{
					path: "/Payment/accessCp",
					name: "AccessCp",
					component: AccessCp
				},
				{
					path: "/Payment/addbank",
					name: "Addbank",
					component: Addbank
				},
				/* {
          path: '/Payment/online',
          name: 'Online',
          component: Online
        },*/
				{
					path: "/report",
					name: "Report",
					component: Report
				},
				{
					path: "/result:id",
					name: "Result",
					component: Result
				},
				{
					path: "/history",
					name: "History",
					component: History
				},
				{
					path: "/userset",
					name: "Userset",
					component: Userset
				},
				{
					path: "/promo/index",
					name: "Promo",
					component: Promo
				}
			]
		},
		{
			path: "/notice:id",
			name: "notice",
			component: notice
		},
		{
			path: "/bonus",
			name: "Bonus",
			component: Bonus
    },
    {
			path: "/returnWater",
			name: "returnWater",
			component: returnWater
		},
		{
			path: "/newYear",
			name: "NewYear",
			component: NewYear
		},
		{
			path: "/ag",
			name: "Ag",
			component: Ag
		},
		{
			path: "/agothers",
			name: "Agothers",
			component: Agothers
		},
		{
			path: "/lyAgGame",
			name: "LyAgGame",
			component: LyAgGame
		},
		{
			path: "/aboutus",
			name: "Aboutus",
			component: Aboutus
		},
		{
			path: "/agent",
			name: "Agent",
			component: Agent
		},
		{
			path: "/faq",
			name: "Faq",
			component: Faq
		},
		{
			path: "/home",
			name: "Home",
			component: Home
		},
		{
			path: "/mobile",
			name: "Mobile",
			component: Mobile
		},
		{
			path: "/mg",
			name: "Mg",
			component: Mg
		},
		{
			path: "/",
			redirect: "/home"
		},
		{
			path: "*",
			redirect: "/"
		}
	]
});
