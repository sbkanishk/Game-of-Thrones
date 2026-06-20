/*
  Houses of Westeros — a family tree guide
  script.js

  Pairs with index.html and styles.css

  Behavior:
  - Clicking a house card on the landing grid scrolls to that house's section
  - Clicking an expandable card/term toggles its "open" class to reveal detail text
  - Both work with mouse and keyboard (Enter / Space) since cards use tabindex
*/

document.addEventListener('DOMContentLoaded', function () {
  initJumpCards();
  initExpandables();
});

/**
 * Landing-grid house cards: clicking or pressing Enter/Space scrolls
 * smoothly to the matching section, identified by [data-jump-to="<section-id>"].
 */
function initJumpCards() {
  var jumpCards = document.querySelectorAll('[data-jump-to]');

  jumpCards.forEach(function (card) {
    card.addEventListener('click', function () {
      jumpToSection(card.getAttribute('data-jump-to'));
    });

    card.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        jumpToSection(card.getAttribute('data-jump-to'));
      }
    });
  });
}

function jumpToSection(sectionId) {
  var target = document.getElementById(sectionId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Expandable cards (.card) and glossary terms (.term): clicking or
 * pressing Enter/Space toggles the "open" class, which CSS uses to
 * reveal the hidden .detail / .more content.
 */
function initExpandables() {
  var expandables = document.querySelectorAll('.card[data-expandable], .term[data-expandable]');

  expandables.forEach(function (item) {
    item.addEventListener('click', function () {
      item.classList.toggle('open');
    });

    item.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        item.classList.toggle('open');
      }
    });
  });
}
