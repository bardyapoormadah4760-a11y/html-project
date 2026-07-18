function openStudentModal(btn) {
    currentStudentCard = btn ? btn.closest('#classGrid > div') : null;
    const overlay = document.getElementById('studentModalOverlay');
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    updateStudentCountLabel();
}
function closeStudentModal(e) {
    if (e) e.stopPropagation();
    const overlay = document.getElementById('studentModalOverlay');
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
}
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeStudentModal();
});
function openMenu() {
    document.getElementById('sidebar').classList.remove('translate-x-full');
    document.getElementById('overlay').classList.remove('hidden');
}
function closeMenu() {
    document.getElementById('sidebar').classList.add('translate-x-full');
    document.getElementById('overlay').classList.add('hidden');
}
function openTeachersModal() {
    const overlay = document.getElementById('teachersModalOverlay');
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
}
function closeTeachersModal(e) {
    if (e) e.stopPropagation();
    const overlay = document.getElementById('teachersModalOverlay');
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
}
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeTeachersModal();
});
function openExcelModal() {
    const overlay = document.getElementById('excelModalOverlay');
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
}
function closeExcelModal(e) {
    if (e) e.stopPropagation();
    const overlay = document.getElementById('excelModalOverlay');
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
}
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeExcelModal();
});
let classCardToDelete = null;
function openDeleteModal(btn) {
    classCardToDelete = btn.closest('#classGrid > *');
    const overlay = document.getElementById('deleteModalOverlay');
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
}
function closeDeleteModal(e) {
    if (e) e.stopPropagation();
    const overlay = document.getElementById('deleteModalOverlay');
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
    classCardToDelete = null;
}
function confirmDeleteClass() {
    if (classCardToDelete) classCardToDelete.remove();
    closeDeleteModal();
}
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDeleteModal();
});

function openCreateClassModal() {
    const overlay = document.getElementById('createClassModalOverlay');
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
}
function closeCreateClassModal(e) {
    if (e) e.stopPropagation();
    const overlay = document.getElementById('createClassModalOverlay');
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
}
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeCreateClassModal();
});

function createNewClass() {
    const overlay = document.getElementById('createClassModalOverlay');
    const name = document.getElementById('newClassName').value.trim() || 'کلاس جدید';
    const teacher = document.getElementById('newClassTeacher').value;
    const mentor = document.getElementById('newClassMentor').value;
    const capacity = document.getElementById('newClassCapacity').value || '0';
    const description = document.getElementById('newClassDescription').value.trim() || 'توضیحاتی ثبت نشده است.';
    const time1 = document.getElementById('newClassTime1').value;
    const time2 = document.getElementById('newClassTime2').value;

    const selectedDays = Array.from(overlay.querySelectorAll('.day-btn'))
        .filter(function (btn) { return btn.classList.contains('bg-blue-600'); })
        .map(function (btn) { return btn.textContent.replace(/\s+/g, ' ').trim(); });
    const uniqueDays = Array.from(new Set(selectedDays));

    const dayBadges = uniqueDays.map(function (day) {
        return '<span class="text-[11px] w-full text-center px-2 py-1 rounded-full bg-slate-100 text-slate-500">' + day + '</span>';
    }).join('');

    let timeBadges = '';
    if (time1 && time1 !== 'انتخاب تایم اول') {
        timeBadges += '<div class="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 rounded-md px-2 py-1 w-fit"><img src="img/clock1.svg" class="w-3.5 h-3.5" alt=""><span>جلسه ۱ : ' + time1 + '</span></div>';
    }
    if (time2 && time2 !== 'بدون تایم دوم (خالی)') {
        timeBadges += '<div class="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 rounded-md px-2 py-1 w-fit"><img src="img/clock2.svg" class="w-3.5 h-3.5" alt=""><span>جلسه ۲ : ' + time2 + '</span></div>';
    }

    const mentorHtml = (mentor && mentor.indexOf('بدون منتور') === -1)
        ? '<div class="text-xs"><div class="flex items-center gap-1.5 text-slate-500"><img src="img/profile-2user2.svg" class="w-3.5 h-3.5 text-slate-400" alt="">منتور : <span class="text-slate-600">' + mentor + '</span></div></div>'
        : '';

    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl border border-slate-200 p-4  hover:shadow-sm transition';
    card.innerHTML =
        '<div class="flex justify-between">' +
        '<div class="flex flex-col gap-2">' +
        '<div class="flex items-center gap-1.5">' +
        '<div class="rounded-lg w-11 h-11 bg-[#DBEAFE] flex justify-center items-center "><img src="img/book jadid.svg" alt=""></div>' +
        '<h3 class="font-bold text-slate-800">' + name + '</h3>' +
        '</div>' +
        '<div class="text-xs"><div class="flex items-center gap-1.5 text-slate-500"><img src="img/teacher.png" class="w-3.5 h-3.5 text-slate-400" alt="">استاد : <span class="text-slate-600">' + teacher + '</span></div></div>' +
        mentorHtml +
        '<p class="text-xs text-slate-400">' + description + '</p>' +
        '</div>' +
        '<div class="flex flex-col w-full max-w-fit">' +
        '<div class="flex items-center flex-col gap-4 ">' +
        '<div class="flex items-center gap-2 w-full">' + dayBadges + '</div>' +
        '<div class="space-y-1.5 flex flex-col items-end">' + timeBadges + '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="flex items-center flex-row-reverse justify-between pt-6 mt-3 border-t border-b-gray-800 ">' +
        '<div class="flex items-center flex-row-reverse gap-3 text-slate-400">' +
        '<button class="hover:text-red-500" title="حذف" data-action="delete"><img src="img/trash.svg" class="w-4 h-4" alt=""></button>' +
        '<button class="hover:text-brand-600" title="ویرایش" data-action="edit"><img src="img/setting-2.svg" class="w-4 h-4" alt=""></button>' +
        '<button class="hover:text-brand-600 " title="اعضا" data-action="students"><img src="img/user-add jadid tar.png" class="w-4 h-4" alt=""></button>' +
        '</div>' +
        '<a href="#" class="text-slate-500 text-xs font-medium flex items-center gap-1"><img src="img/clock.svg" alt="">' + toPersianDigits(uniqueDays.length) + ' روز<img src="img/profile-2user3.svg" class="w-3.5 h-3.5" alt="">' + toPersianDigits(0) + ' از ' + toPersianDigits(capacity) + ' نفر</a>' +
        '</div>';

    document.getElementById('classGrid').prepend(card);
    closeCreateClassModal();
}

document.querySelectorAll('.day-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('bg-blue-600');
        btn.classList.toggle('text-white');
        btn.classList.toggle('border-blue-600');
        btn.classList.toggle('bg-slate-50');
        btn.classList.toggle('text-slate-600');
        btn.classList.toggle('border-slate-200');
    });
});
let currentEditCard = null;
let currentStudentCard = null;

function toEnglishDigits(str) {
    return str.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
}

function toPersianDigits(num) {
    return String(num).replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
}

function textAfterColon(text) {
    const idx = text.indexOf(' : ');
    return idx >= 0 ? text.slice(idx + 3).trim() : text.trim();
}

function setSelectValue(selectEl, text) {
    if (!selectEl || !text) return;
    let found = false;
    selectEl.querySelectorAll('option').forEach(opt => {
        if (opt.textContent.trim() === text.trim()) {
            opt.selected = true;
            found = true;
        }
    });
    if (!found) {
        const opt = document.createElement('option');
        opt.textContent = text.trim();
        selectEl.insertBefore(opt, selectEl.firstChild);
        opt.selected = true;
    }
}

function loadCardData(card) {
    const nameEl = card.querySelector('h3');
    document.getElementById('editClassName').value = nameEl ? nameEl.textContent.trim() : '';

    const teacherRow = Array.from(card.querySelectorAll('.text-slate-500')).find(el => el.textContent.includes('استاد'));
    const teacherSpan = teacherRow ? teacherRow.querySelector('span') : null;
    setSelectValue(document.getElementById('editClassTeacher'), teacherSpan ? teacherSpan.textContent : '');

    const mentorRow = Array.from(card.querySelectorAll('.text-slate-500')).find(el => el.textContent.includes('منتور'));
    const mentorSelect = document.getElementById('editClassMentor');
    if (mentorRow) {
        setSelectValue(mentorSelect, mentorRow.textContent.replace('منتور', '').replace(':', '').trim());
    } else {
        mentorSelect.selectedIndex = 0;
    }

    const cardDays = Array.from(card.querySelectorAll('.rounded-full.bg-slate-100'))
        .map(el => el.textContent.replace(/\s+/g, ' ').trim());
    document.querySelectorAll('#editDays .day-btn').forEach(btn => {
        const isActive = cardDays.includes(btn.textContent.replace(/\s+/g, ' ').trim());
        btn.classList.toggle('bg-blue-600', isActive);
        btn.classList.toggle('text-white', isActive);
        btn.classList.toggle('border-blue-600', isActive);
        btn.classList.toggle('bg-slate-50', !isActive);
        btn.classList.toggle('text-slate-600', !isActive);
        btn.classList.toggle('border-slate-200', !isActive);
    });

    const time1El = card.querySelector('.text-blue-600.bg-blue-50 span');
    const time2El = card.querySelector('.text-emerald-600.bg-emerald-50 span');
    const time2Select = document.getElementById('editClassTime2');
    if (time1El) setSelectValue(document.getElementById('editClassTime1'), textAfterColon(time1El.textContent).replace('تا', '-'));
    if (time2El) setSelectValue(time2Select, textAfterColon(time2El.textContent).replace('تا', '-'));
    else time2Select.selectedIndex = 0;

    const footerLink = card.querySelector('a.text-slate-500');
    let capacity = '';
    if (footerLink) {
        const match = toEnglishDigits(footerLink.textContent).match(/(\d+)\s*نفر/);
        if (match) capacity = match[1];
    }
    document.getElementById('editClassCapacity').value = capacity;

    const descEl = card.querySelector('p.text-xs.text-slate-400');
    const descText = descEl ? descEl.textContent.trim() : '';
    document.getElementById('editClassDescription').value = descText === 'توضیحاتی ثبت نشده است.' ? '' : descText;
}

function openEditClassModal(btn) {
    currentEditCard = btn.closest('#classGrid > div');
    if (!currentEditCard) return;
    loadCardData(currentEditCard);
    const overlay = document.getElementById('editClassModalOverlay');
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
}

function closeEditClassModal(event) {
    if (event && event.target !== event.currentTarget) return;
    const overlay = document.getElementById('editClassModalOverlay');
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
}

function saveClassChanges() {
    if (!currentEditCard) return;

    const nameEl = currentEditCard.querySelector('h3');
    if (nameEl) nameEl.textContent = document.getElementById('editClassName').value.trim();

    const teacherRow = Array.from(currentEditCard.querySelectorAll('.text-slate-500')).find(el => el.textContent.includes('استاد'));
    if (teacherRow) {
        const span = teacherRow.querySelector('span');
        if (span) span.textContent = document.getElementById('editClassTeacher').value;
    }

    const mentorRow = Array.from(currentEditCard.querySelectorAll('.text-slate-500')).find(el => el.textContent.includes('منتور'));
    if (mentorRow) {
        const span = mentorRow.querySelector('span');
        const mentorValue = document.getElementById('editClassMentor').value;
        if (span) span.textContent = 'منتور : ' + mentorValue;
    }

    const selectedDays = Array.from(document.querySelectorAll('#editDays .day-btn'))
        .filter(btn => btn.classList.contains('bg-blue-600'))
        .map(btn => btn.textContent.replace(/\s+/g, ' ').trim());
    const uniqueDays = Array.from(new Set(selectedDays));

    const daysContainer = currentEditCard.querySelector('.flex.items-center.gap-2.w-full');
    if (daysContainer) {
        daysContainer.innerHTML = uniqueDays.map(day =>
            '<span class="text-[11px] w-full text-center px-2 py-1 rounded-full bg-slate-100 text-slate-500">' + day + '</span>'
        ).join('');
    }

    const time1El = currentEditCard.querySelector('.text-blue-600.bg-blue-50 span');
    if (time1El) time1El.textContent = 'جلسه ۱ : ' + document.getElementById('editClassTime1').value.replace('-', 'تا');

    const time2El = currentEditCard.querySelector('.text-emerald-600.bg-emerald-50 span');
    if (time2El) time2El.textContent = 'جلسه ۲ : ' + document.getElementById('editClassTime2').value.replace('-', 'تا');

    const descEl = currentEditCard.querySelector('p.text-xs.text-slate-400');
    if (descEl) {
        const desc = document.getElementById('editClassDescription').value.trim();
        descEl.textContent = desc || 'توضیحاتی ثبت نشده است.';
    }

    const footerLink = currentEditCard.querySelector('a.text-slate-500');
    if (footerLink) {
        footerLink.innerHTML = footerLink.innerHTML.replace(/[۰-۹0-9]+(?=\s*روز)/, toPersianDigits(uniqueDays.length));
        const capacity = document.getElementById('editClassCapacity').value;
        footerLink.innerHTML = footerLink.innerHTML.replace(/[۰-۹0-9]+(?=\s*نفر)/, toPersianDigits(capacity));
    }

    closeEditClassModal();
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeEditClassModal();
});

function updateStudentCountLabel() {
    const listContainer = document.querySelector('#studentModalOverlay .overflow-y-auto');
    const count = listContainer ? listContainer.querySelectorAll('.student-row').length : 0;
    const label = document.getElementById('studentCountLabel');
    if (label) label.textContent = 'دانش آموزان این دوره (' + toPersianDigits(count) + ')';
    if (currentStudentCard) {
        const footerLink = currentStudentCard.querySelector('a.text-slate-500');
        if (footerLink) {
            footerLink.innerHTML = footerLink.innerHTML.replace(/[۰-۹0-9]+(?=\s*از)/, toPersianDigits(count));
        }
    }
}

function addStudentRow(name, phone) {
    const listContainer = document.querySelector('#studentModalOverlay .overflow-y-auto');
    if (!listContainer) return;
    const row = document.createElement('div');
    row.className = 'student-row flex flex-row-reverse items-center justify-between border-b border-gray-200 py-4';
    row.innerHTML =
        '<button type="button" data-action="remove-student" class="text-sm font-medium text-red-600 hover:text-red-700 cursor-pointer">حذف از دوره</button>' +
        '<span class="text-sm text-gray-600" dir="ltr">' + phone + '</span>' +
        '<div class="flex flex-row-reverse items-center gap-2">' +
        '<span class="text-sm font-medium text-gray-800">' + name + '</span>' +
        '<div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">' +
        '<img src="img/user-add jadid tar.png" alt="" class="w-4 h-4">' +
        '</div>' +
        '</div>';
    listContainer.appendChild(row);
    updateStudentCountLabel();
}

function addStudentPrompt() {
    const name = prompt('نام دانش‌آموز را وارد کنید:');
    if (!name || !name.trim()) return;
    const phone = prompt('شماره موبایل را وارد کنید:') || '';
    addStudentRow(name.trim(), phone.trim());
}

document.getElementById('studentModal').addEventListener('click', function (e) {
    const btn = e.target.closest('[data-action="remove-student"]');
    if (!btn) return;
    const row = btn.closest('.student-row');
    if (row) row.remove();
    updateStudentCountLabel();
});

document.getElementById('classGrid').addEventListener('click', function (e) {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    if (action === 'delete') openDeleteModal(btn);
    else if (action === 'edit') openEditClassModal(btn);
    else if (action === 'students') openStudentModal(btn);
});

function getCardTeacherName(card) {
    const teacherRow = Array.from(card.querySelectorAll('.text-slate-500')).find(el => el.textContent.includes('استاد'));
    const span = teacherRow ? teacherRow.querySelector('span') : null;
    return span ? span.textContent.trim() : '';
}

function getCardMentorName(card) {
    const mentorRow = Array.from(card.querySelectorAll('.text-slate-500')).find(el => el.textContent.includes('منتور'));
    return mentorRow ? mentorRow.textContent.replace('منتور', '').replace(':', '').trim() : '';
}

function filterClassesBy(type, name) {
    document.querySelectorAll('#classGrid > div').forEach(function (card) {
        const value = type === 'mentor' ? getCardMentorName(card) : getCardTeacherName(card);
        card.classList.toggle('hidden', value !== name);
    });
    const bar = document.getElementById('filterBackBarContainer');
    if (bar) bar.classList.remove('hidden');
    closeTeachersModal();
}

function showAllClasses() {
    document.querySelectorAll('#classGrid > div').forEach(function (card) {
        card.classList.remove('hidden');
    });
    const bar = document.getElementById('filterBackBarContainer');
    if (bar) bar.classList.add('hidden');
}

const teachersListEl = document.querySelector('#teachersModalOverlay .divide-y');
if (teachersListEl) {
    teachersListEl.addEventListener('click', function (e) {
        const btn = e.target.closest('button[data-filter-type]');
        if (!btn) return;
        filterClassesBy(btn.dataset.filterType, btn.dataset.filterName);
    });
}

function openMenu() {
    document.getElementById('sidebar').classList.remove('translate-x-full');
    document.getElementById('overlay').classList.remove('hidden');
}
function closeMenu() {
    document.getElementById('sidebar').classList.add('translate-x-full');
    document.getElementById('overlay').classList.add('hidden');
}
function toggleMobileTeacherDropdown() {
    var panel = document.getElementById('mobileTeacherDropdownPanel');
    var arrow = document.getElementById('mobileTeacherFilterArrow');
    var btn = document.getElementById('mobileTeacherFilterBtn');
    if (!panel) return;
    var isHidden = panel.classList.contains('hidden');
    panel.classList.toggle('hidden');
    if (arrow) arrow.style.transform = isHidden ? 'rotate(180deg)' : '';
    if (btn) btn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
}

function selectMobileTeacherFilter(filterType, filterName) {
    var target = document.querySelector(
        '#teachersModalOverlay [data-filter-type="' + filterType + '"][data-filter-name="' + filterName + '"]'
    );
    if (target) target.click();
    toggleMobileTeacherDropdown();
}

document.addEventListener('click', function (e) {
    var wrap = document.getElementById('mobileTeacherFilterWrap');
    var panel = document.getElementById('mobileTeacherDropdownPanel');
    if (!wrap || !panel || panel.classList.contains('hidden')) return;
    if (!wrap.contains(e.target)) toggleMobileTeacherDropdown();
});

document.addEventListener('keydown', function (e) {
    var panel = document.getElementById('mobileTeacherDropdownPanel');
    if (e.key === 'Escape' && panel && !panel.classList.contains('hidden')) {
        toggleMobileTeacherDropdown();
    }
});
    function toggleExcelOptionsMenu(event) {
      if (event) event.stopPropagation();
      const menu = document.getElementById('excelOptionsMenu');
      const btn = document.getElementById('excelOptionsBtn');
      if (!menu || !btn) return;
      const isOpen = !menu.classList.contains('hidden');
      if (isOpen) {
        closeExcelOptionsMenu();
      } else {
        menu.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
      }
    }

    function closeExcelOptionsMenu() {
      const menu = document.getElementById('excelOptionsMenu');
      const btn = document.getElementById('excelOptionsBtn');
      if (!menu || !btn) return;
      menu.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
    }

    function selectExcelOption(type) {
      closeExcelOptionsMenu();
      if (typeof openExcelModal === 'function') {
        openExcelModal();
      }
    }

    document.addEventListener('click', function (e) {
      const menu = document.getElementById('excelOptionsMenu');
      const btn = document.getElementById('excelOptionsBtn');
      if (menu && !menu.classList.contains('hidden') && !menu.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
        closeExcelOptionsMenu();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeExcelOptionsMenu();
    });