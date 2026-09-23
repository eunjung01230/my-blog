/*
  Mermaid 다이어그램 초기화. front matter 에 mermaid: true 가 있는 글에서만 로드된다. (_layouts/default.html)
  - kramdown(Rouge 3.x)은 ```mermaid 블록을 <pre><code class="language-mermaid"> 로 출력한다.
  - 그 <pre> 를 <div class="mermaid"> 로 바꿔 mermaid 가 그리게 한다.
    (textContent 로 옮겨 &gt; 같은 HTML 엔티티를 원래 문법으로 되돌린다)
  - 렌더링에 실패하면 원래 코드 블록을 그대로 둔다.
*/
(function () {
  if (typeof window.mermaid === 'undefined') return;

  var blocks = document.querySelectorAll('.post-content pre > code.language-mermaid');
  if (!blocks.length) return;

  var nodes = [];
  blocks.forEach(function (code) {
    var pre = code.parentElement;
    var diagram = document.createElement('div');
    diagram.className = 'mermaid';
    diagram.textContent = code.textContent;
    pre.hidden = true;
    pre.insertAdjacentElement('afterend', diagram);
    nodes.push({ pre: pre, diagram: diagram });
  });

  window.mermaid.initialize({ startOnLoad: false, theme: 'neutral' });

  nodes.forEach(function (node) {
    window.mermaid.run({ nodes: [node.diagram] }).then(function () {
      node.pre.remove();
    }).catch(function () {
      node.diagram.remove();
      node.pre.hidden = false;
    });
  });
})();
