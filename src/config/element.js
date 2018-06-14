import Vue from "vue";
import {
	Row,
	Col,
	Input,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	Tabs,
	TabPane,
	Radio,
	Checkbox,
	DatePicker,
	Table,
	TableColumn,
	Pagination,
	Carousel,
	CarouselItem,
	Select,
	Option,
	Steps,
	Step,
	Main,
	Container,
	Header,
	TimeSelect,
	MessageBox,
	Message,
	Alert,
	RadioButton,
	RadioGroup
} from "element-ui";
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Input);
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(DatePicker);
Vue.use(Checkbox);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Main);
Vue.use(Container);
Vue.use(Header);
Vue.use(TimeSelect);
Vue.use(Alert);
Vue.use(RadioButton);
Vue.use(RadioGroup);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
