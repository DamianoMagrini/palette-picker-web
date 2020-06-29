interface ClassArray extends Array<ClassValue> {}

interface ClassDictionary {
	[id: string]: any;
}

type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined;

const to_value = (mixed_value: ClassValue): string => {
	let value = '';

	if (mixed_value) {
		if (typeof mixed_value === 'object') {
			if (mixed_value instanceof Array) {
				for (let index = 0; index < mixed_value.length; index++) {
					const temp_value = to_value(mixed_value[index]);
					if (mixed_value[index] && temp_value) {
						value && (value += ' ');
						value += temp_value;
					}
				}
			} else {
				for (let key in mixed_value) {
					const temp_value = to_value(key);
					if (mixed_value[key] && temp_value) {
						value && (value += ' ');
						value += temp_value;
					}
				}
			}
		} else if (typeof mixed_value !== 'boolean') {
			value && (value += ' ');
			value += mixed_value;
		}
	}

	return value;
};

export const clsx = (...classes: ClassValue[]): string => {
	let class_name = '';

	for (let index = 0; index < classes.length; index++) {
		const value = to_value(classes[index]);
		if (value) {
			if (class_name) class_name += ' ';
			class_name += value;
		}
	}

	return class_name;
};
