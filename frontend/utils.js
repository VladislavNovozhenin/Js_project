import { svgPhone, svgFb, svgVk, svgEmail, svgOther } from "./svg.js";
import { contactTooltip } from "./createTooltip.js";

export function createContactLink(type, value, element, svg, item) {
    const setTooltip = contactTooltip(type, value);
    element = document.createElement('a');
    element.classList.add('contacts__link');
    element.innerHTML = svg;

    if (type === 'Email') {
        element.href = `mailto:${value.trim()}`
    } else if (type === 'Телефон') {
        element.href = `tel:${value.trim()}`
        setTooltip.tooltipValue.style.color = 'var(--color-FFF)';
        setTooltip.tooltipValue.style.textDecoration = 'none';
    } else {
        element.href = value.trim();
    }
    element.append(setTooltip.tooltip);
    item.append(element);
}

export function createContactItemByType(type, value, item) {
    switch (type) {
        case 'Телефон':
            let phone;
            createContactLink(type, value, phone, svgPhone(), item);
            break;
        case 'Facebook':
            let fb;
            createContactLink(type, value, fb, svgFb(), item);
            break;
        case 'VK':
            let vk;
            createContactLink(type, value, vk, svgVk(), item);
            break;
        case 'Email':
            let email;
            createContactLink(type, value, email, svgEmail(), item);
            break;
        case 'Другое':
            let other;
            createContactLink(type, value, other, svgOther(), item);
            break;

        default:
            break;
    }
}