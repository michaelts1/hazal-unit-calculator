import { reactive } from 'vue'

const messages = {
	en: {
		_dir: 'ltr',
		_name: 'English',
		amah: 'amah',
		beitza: 'beitza',
		centimeterLong: 'centimeter',
		centimeterShort: 'cm',
		chazonIsh: 'Chazon Ish',
		copyright: '© Michael Tsaban',
		cubicCentimeterShort: 'cc',
		cubicMeterShort: 'cbm',
		eifa: 'eifa',
		etzba: 'etzba',
		grach: 'Rav Chaim Naeh',
		grogeret: 'grogeret',
		input: 'Input',
		invalidNumber: 'Please enter a number',
		kav: 'kav',
		kilometerLong: 'kilometer',
		kilometerShort: 'km',
		kor: 'kor',
		kortov: 'kortov',
		length: 'Length',
		literLong: 'liter',
		litra: 'litra',
		log: 'log',
		messageLength: 'Attention: The sit is calculated according to Maimonides',
		messageVolume: 'Attention: The peras is calculated according to Maimonide and the zait according to the Shulchan Aruch',
		meterLong: 'meter',
		mil: 'mil',
		millimeterShort: 'mm',
		output: 'Output',
		parsa: 'parsa',
		peras: 'peras',
		posek: 'Posek',
		ris: 'ris',
		seah: 'seah',
		sit: 'sit',
		switchInputOutput: 'Switch input and output',
		tefach: 'tefach',
		title: 'Hazal Unit Calculator',
		type: 'Type',
		volume: 'Volume',
		zait: 'zait',
		zeret: 'zeret',
	},

	he: {
		_dir: 'rtl',
		_name: 'עברית',
		amah: 'אמה',
		beitza: 'ביצה',
		centimeterLong: 'סנטימטר',
		centimeterShort: 'ס"מ',
		chazonIsh: 'חזון איש',
		copyright: '© מיכאל צבאן',
		cubicCentimeterShort: 'סמ"ק',
		cubicMeterShort: 'מ"ק',
		eifa: 'איפה',
		etzba: 'אצבע',
		grach: 'רב חיים נאה',
		grogeret: 'גרוגרת',
		input: 'קלט',
		invalidNumber: 'נא הכנס מספר',
		kav: 'קב',
		kilometerLong: 'קילומטר',
		kilometerShort: 'ק"מ',
		kor: 'כור',
		kortov: 'קורטוב',
		length: 'מרחק',
		literLong: 'ליטר',
		litra: 'ליטרא',
		log: 'לוג',
		messageLength: 'שים לב: הסיט מחושב לפי שיטת הרמב"ם',
		messageVolume: 'שים לב: הפרס מחושב לפי שיטת הרמב"ם והזית לפי השולחן ערוך',
		meterLong: 'מטר',
		mil: 'מיל',
		millimeterShort: 'מ"מ',
		output: 'תוצאה',
		parsa: 'פרסה',
		peras: 'פרס',
		posek: 'שיטת פסיקה',
		ris: 'ריס',
		seah: 'סאה',
		sit: 'סיט',
		switchInputOutput: 'החלף בין הקלט לתוצאה',
		tefach: 'טפח',
		title: 'מחשבון יחידות תלמודיות',
		type: 'תחום',
		volume: 'נפח',
		zait: 'זית',
		zeret: 'זרת',
	},
}

type MessagesLocale = keyof typeof messages
type Messages = typeof messages[MessagesLocale]
type MessageName = keyof Messages

class I18n {
	currentLocale: MessagesLocale
	messages!: Messages

	constructor(locale: MessagesLocale) {
		this.currentLocale = locale
		this.changeLocale(locale)
	}

	t(name: MessageName, locale?: MessagesLocale) {
		return locale ? messages[locale][name] : this.messages[name]
	}

	changeLocale(locale: MessagesLocale) {
		this.currentLocale = locale
		localStorage.setItem('locale', locale)
		this.messages = messages[this.currentLocale]

		document.documentElement.dir = this.t('_dir')
		document.title = this.t('title')
	}
}

/** @returns {MessagesLocale} Last used locale, defaults to 'he' */
function getLocaleCookie(): MessagesLocale {
	const locale = localStorage.getItem('locale') as MessagesLocale | null
	return locale ?? 'he'
}

export const i18n = reactive(new I18n(getLocaleCookie()))
