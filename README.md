<!DOCTYPE html>
<html lang="ja">
<head>
    <!-- headに追加 -->
<link href="https://fonts.googleapis.com/css2?family=M+PLUS+1p&display=swap" rel="stylesheet">

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>江津ゼミ３ねん タスク管理</title>
  <style>
    body {
      font-family: sans-serif;
      background-color: #f5ffff;
      margin: 0;
      padding: 0;
    }
    header {
      text-align: center;
      padding: 1rem;
    }
    h1 {
      font-size: 1.5rem;
      color: #49a6e9;
    }
    .subtitle {
      color: #49a6e9;
      font-weight: bold;
      font-size: 1rem;
      margin-top: -0.5rem;
    }
    .menu-icon {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 2rem;
      height: 1.5rem;
      background-color: #49a6e9;
      border-radius: 4px;
    }
    .tabs {
      display: flex;
      justify-content: center;
      background-color: #b2dff4;
    }
    .tab {
      padding: 1rem;
      flex: 1;
      text-align: center;
      background-color: #b2dff4;
      border: none;
      cursor: pointer;
      font-weight: bold;
    }
    /* 共通ボタンスタイル */
.custom-button {
  background-color: #4CAF50; /* メインカラー（例） */
  color: white;
  padding: 6px 14px;
  margin: 4px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;
}
.custom-button:hover {
  background-color: #45a049;
}

/* 入力欄（input[type=text]など） */
.custom-input {
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-right: 6px;
}
    .tab.active {
      background-color: #6fb8e3;
    }
    .tab-content {
      display: none;
      padding: 1rem;
    }
    .tab-content.active {
      display: block;
    }
    .circle-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      padding: 1rem;
    }
    .circle {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      font-size: 1.2rem;
      color: white;
    }
    .green { background-color: #66c266; }
    .yellow { background-color: #e6e600; color: #333; }
    .orange { background-color: #FF9800; }
    .red { background-color: #e66464; }

    .calendar {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0.5rem;
      text-align: center;
      margin-bottom: 1rem;
    }
    .day {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .event-day {
      background-color: #ffeb99;
    }
    .month-title {
      text-align: center;
      font-weight: bold;
      font-size: 1.2rem;
      margin: 1rem 0 0.5rem 0;
    }
    .event-list {
      list-style: none;
      padding: 0;
    }
    .event-list li {
      padding: 0.3rem;
      border-bottom: 1px solid #ddd;
    }
    .project {
      margin-bottom: 1rem;
    }
    .circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin: 10px;
  color: white;
  cursor: pointer;
}

.green { background-color: #4CAF50; }
.yellow { background-color: #FFEB3B; color: black; }
.orange { background-color: #FF9800; }
.red { background-color: #F44336; }

.circle-grid {
  display: flex;
  flex-wrap: wrap;
}
    .project-title {
      font-weight: bold;
      font-size: 1.1rem;
      margin-bottom: 0.3rem;
    }
    .task-list {
      list-style: disc;
      margin-left: 1.5rem;
    }
  </style>
</head>
<body>
    <script>
        if (localStorage.getItem("loggedIn") !== "true") {
          window.location.href = "login.html";
        }
      </script>
      
  <header>
    <h1>江津ゼミ３ねん</h1>
    <div class="subtitle">〜抱え込まないようにしよう〜</div>
  </header>

  <div class="tabs">
    <button class="tab active" onclick="openTab(event, 'yotei')">予定</button>
    <button class="tab" onclick="openTab(event, 'task')">タスク管理</button>
    <button class="tab" onclick="openTab(event, 'progress')">進捗</button>
  </div>

  <div id="yotei" class="tab-content active">

<!-- カレンダー表示 -->
<div id="calendar" style="margin-top: 1rem;"></div>

<!-- 予定リスト -->
<ul id="scheduleList" style="margin-top: 1rem;"></ul>

<!-- FullCalendarライブラリ -->
<script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.js"></script>
      <!-- 予定追加ボタンとフォーム -->
      <button onclick="toggleScheduleForm()" class="custom-button">予定を追加する</button>

<input type="date" id="scheduleDate" class="custom-input" />
<input type="text" id="scheduleTitle" placeholder="予定のタイトル" class="custom-input" />
<label for="scheduleColor">色:</label>
<input type="color" id="scheduleColor" value="#ffcc99" class="custom-input" />
  <button onclick="addSchedule()" class="custom-button">追加</button>
</div>

<!-- カレンダー表示 -->
<div id="calendar" style="margin-top: 1rem;"></div>

<!-- 予定リスト -->
<ul id="scheduleList" style="margin-top: 1rem;"></ul>

<!-- FullCalendarライブラリ -->
<script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.js"></script>

<script>
    let calendar;
    let scheduleItems = [];
    let editingEvent = null;
  
    document.addEventListener('DOMContentLoaded', function () {
      const calendarEl = document.getElementById('calendar');
      calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'ja',
        events: scheduleItems,
        dateClick: function(info) {
          document.getElementById('scheduleDate').value = info.dateStr;
          toggleScheduleForm(true);
        }
      });
      calendar.render();
    });
  
    function toggleScheduleForm(forceShow = false) {
      const form = document.getElementById('addScheduleForm');
      if (forceShow) {
        form.style.display = 'block';
      } else {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
      }
    }
  
    function addSchedule() {
      const date = document.getElementById('scheduleDate').value;
      const title = document.getElementById('scheduleTitle').value;
      const color = document.getElementById('scheduleColor').value;
      const newEvent = calendar.addEvent({
  id: String(Date.now()), // ← 追加
  title,
  start: date,
  backgroundColor: color,
  borderColor: color
});
      if (!date || !title) {
        alert('日付とタイトルを入力してください');
        return;
      }
  
      if (editingEvent) {
        // 編集モード
        editingEvent.setProp('title', title);
        editingEvent.setStart(date);
        editingEvent.setProp('backgroundColor', color);
        editingEvent.setProp('borderColor', color);
  
        updateScheduleList();
        editingEvent = null;
      } else {
        // 新規追加
        const newEvent = calendar.addEvent({
          title,
          start: date,
          backgroundColor: color,
          borderColor: color
        });
        scheduleItems.push(newEvent);
        appendToScheduleList(newEvent);
      }
  
      // リセット
      document.getElementById('scheduleDate').value = '';
      document.getElementById('scheduleTitle').value = '';
      document.getElementById('scheduleColor').value = '#ffcc99';
      document.getElementById('addScheduleForm').style.display = 'none';
    }
  
    function appendToScheduleList(event) {
      const li = document.createElement('li');
      li.setAttribute('data-event-id', event.id);
      li.style.color = event.backgroundColor;
      updateListItemContent(li, event);
      document.getElementById('scheduleList').appendChild(li);
    }
  
    function updateListItemContent(li, event) {
      li.innerHTML = `
        ${event.startStr}：${event.title}
        <button onclick="editSchedule('${event.id}')">編集</button>
        <button onclick="deleteSchedule('${event.id}')">削除</button>
      `;
    }
  
    function updateScheduleList() {
      const list = document.getElementById('scheduleList');
      list.innerHTML = '';
      scheduleItems.forEach(event => {
        appendToScheduleList(event);
      });
    }
  
    function editSchedule(id) {
      const event = calendar.getEventById(id);
      if (event) {
        document.getElementById('scheduleDate').value = event.startStr;
        document.getElementById('scheduleTitle').value = event.title;
        document.getElementById('scheduleColor').value = event.backgroundColor || '#ffcc99';
        document.getElementById('addScheduleForm').style.display = 'block';
        editingEvent = event;
      }
    }
  
    function deleteSchedule(id) {
      const event = calendar.getEventById(id);
      if (event) {
        event.remove();
        scheduleItems = scheduleItems.filter(e => e.id !== id);
        updateScheduleList();
      }
    }
  </script>  
  </div>
  <div id="task" class="tab-content">
    <div class="circle-grid" id="circleGrid">
      <!-- JavaScriptでここにメンバーの円が追加される -->
    </div>
  </div>
  
  <script>
    const members = ['稲山', '今澤', '加藤', '河上', '鈴木', '別所', '本田', '町野', '見田', '向井', '森'];
  
    function getColorByTaskCount(count) {
      if (count <= 1) return 'green';
      if (count === 2) return 'yellow';
      if (count === 3) return 'orange';
      return 'red';
    }
  
    function goToMember(name) {
      window.location.href = `member.html?name=${encodeURIComponent(name)}`;
    }
  
    const grid = document.getElementById('circleGrid');
  
    members.forEach(name => {
      const tasks = JSON.parse(localStorage.getItem(`tasks_${name}`)) || [];
      const color = getColorByTaskCount(tasks.length);
  
      const div = document.createElement('div');
      div.className = `circle ${color}`;
      div.textContent = name;
      div.onclick = () => goToMember(name);
  
      grid.appendChild(div);
    });
  </script>

  <div id="progress" class="tab-content">
<!-- プロジェクト追加フォーム -->
<div style="margin-bottom: 1rem;">
    <input type="text" id="projectName" placeholder="プロジェクト名を入力" class="custom-input" />
    <button onclick="addProject()" class="custom-button">プロジェクト追加</button>
  </div>
  
  <!-- プロジェクト表示領域 -->
  <div id="projectsContainer"></div>
  
  <script>
    let projectCount = 0;
  
    function addProject() {
      const name = document.getElementById('projectName').value.trim();
      if (!name) {
        alert('プロジェクト名を入力してください');
        return;
      }
  
      const projectId = 'project-' + (++projectCount);
      const projectDiv = document.createElement('div');
      projectDiv.id = projectId;
      projectDiv.style.marginBottom = '2rem';
      projectDiv.style.border = '1px solid #ccc';
      projectDiv.style.padding = '1rem';
  
      // プロジェクト表示 HTML
      projectDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <h3 id="${projectId}-title">${name}</h3>
          <div>
            <button onclick="editProjectTitle('${projectId}')" class="custom-button">編集</button>
            <button onclick="deleteProject('${projectId}')" class="custom-button">削除</button>
          </div>
        </div>
        <input type="text" placeholder="やることを入力" id="${projectId}-taskInput" class="custom-input" />
        <button onclick="addTask('${projectId}')" class="custom-button">やること追加</button>
        <ul id="${projectId}-taskList"></ul>
      `;
  
      document.getElementById('projectsContainer').appendChild(projectDiv);
      document.getElementById('projectName').value = '';
    }
  
    function editProjectTitle(projectId) {
      const titleEl = document.getElementById(`${projectId}-title`);
      const newTitle = prompt("新しいプロジェクト名を入力してください", titleEl.textContent);
      if (newTitle && newTitle.trim()) {
        titleEl.textContent = newTitle.trim();
      }
    }
  
    function deleteProject(projectId) {
      if (confirm('このプロジェクトを削除しますか？')) {
        const projectDiv = document.getElementById(projectId);
        projectDiv.remove();
      }
    }
  
    function addTask(projectId) {
      const input = document.getElementById(`${projectId}-taskInput`);
      const taskText = input.value.trim();
      if (!taskText) {
        alert('やることを入力してください');
        return;
      }
  
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.marginTop = '0.5rem';
  
      // チェックボックス
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.style.marginRight = '0.5rem';
      checkbox.onchange = () => {
        span.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
      };
  
      // タスク本文
      const span = document.createElement('span');
      span.textContent = taskText;
  
      // 削除ボタン
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '削除';
      deleteBtn.style.marginLeft = '1rem';
      deleteBtn.onclick = () => li.remove();
  
      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      document.getElementById(`${projectId}-taskList`).appendChild(li);
      input.value = '';
    }
  </script>
  
  </div>

  <script>
    function openTab(evt, tabName) {
      const tabs = document.querySelectorAll('.tab');
      const contents = document.querySelectorAll('.tab-content');

      tabs.forEach(tab => tab.classList.remove('active'));
      contents.forEach(content => content.classList.remove('active'));

      evt.currentTarget.classList.add('active');
      document.getElementById(tabName).classList.add('active');
    }
  </script>
</body>
</html>
