document.addEventListener('DOMContentLoaded', () => {
  // add click events to all of the navbar burger btns
  const navbarBurgerBtns = Array.from(document.getElementsByClassName('navbar-burger'));
  navbarBurgerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (!target) {
        return;
      }
  
      // activate navbar burger btn and navbar burger menu
      btn.classList.toggle('is-active');
      target.classList.toggle('is-active');
    });
  });

  const navLinks = Array.from(document.getElementsByClassName('nav-link'));
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const navBurgerBtn = document.getElementById(link.dataset.target);
      const navMenu = document.getElementById(navBurgerBtn.dataset.target);
      if (!navBurgerBtn || !navMenu) {
        return;
      }

      // close burger menu
      navBurgerBtn.classList.remove('is-active');
      navMenu.classList.remove('is-active');
    });
  });

  configureTerminal();
});

// setting up the terminal
function configureTerminal() {
  // Custom theme to match style of xterm.js logo
  const baseTheme = {
    foreground: '#F8F8F8',
    background: '#2D2E2C',
    selection: '#5DA5D533',
    black: '#1E1E1D',
    brightBlack: '#262625',
    red: '#CE5C5C',
    brightRed: '#FF7272',
    green: '#5BCC5B',
    brightGreen: '#72FF72',
    yellow: '#CCCC5B',
    brightYellow: '#FFFF72',
    blue: '#5D5DD3',
    brightBlue: '#7279FF',
    magenta: '#BC5ED1',
    brightMagenta: '#E572FF',
    cyan: '#5DA5D5',
    brightCyan: '#72F0FF',
    white: '#F8F8F8',
    brightWhite: '#FFFFFF'
  };

  // vscode-snazzy https://github.com/Tyriar/vscode-snazzy
  const otherTheme = {
    foreground: '#eff0eb',
    background: '#282a36',
    selection: '#97979b33',
    black: '#282a36',
    brightBlack: '#686868',
    red: '#ff5c57',
    brightRed: '#ff5c57',
    green: '#5af78e',
    brightGreen: '#5af78e',
    yellow: '#f3f99d',
    brightYellow: '#f3f99d',
    blue: '#57c7ff',
    brightBlue: '#57c7ff',
    magenta: '#ff6ac1',
    brightMagenta: '#ff6ac1',
    cyan: '#9aedfe',
    brightCyan: '#9aedfe',
    white: '#f1f1f0',
    brightWhite: '#eff0eb'
  };

  let isBaseTheme = true;
  
  const terminal = new window.Terminal({
    fontFamily: '"Cascadia Code", Menlo, monospace',
    theme: isBaseTheme ? baseTheme : otherTheme,
    cursorBlink: true
  });
  var fitAddOn = new window.FitAddon.FitAddon();

  terminal.loadAddon(fitAddOn);
  terminal.open(document.querySelector('.terminal-wrapper'));
  fitAddOn.fit();

  window.addEventListener('resize', function() {
    setTimeout(function() {
      fitAddOn.fit();
    }, 20);
  });
  
  var isWebglEnabled = false;
  try {
    const webgl = new window.WebglAddon.WebglAddon();
    terminal.loadAddon(webgl);
    isWebglEnabled = true;
  } catch (e) {
    console.warn('WebGL addon threw an exception during load', e);
  }
  
  // Cancel wheel events from scrolling the page if the terminal has scrollback
  document.querySelector('.xterm').addEventListener('wheel', e => {
    if (terminal.buffer.active.baseY > 0) {
      e.preventDefault();
    }
  });
  
  function runFakeTerminal() {
    if (terminal._initialized) {
      return;
    }

    terminal._initialized = true;

    terminal.prompt = () => {
      terminal.write('\r\n$ ');
    };

    terminal.writeln('type `help` to see some options:');
    prompt(terminal);

    terminal.onData(e => {
      switch (e) {
        case '\u0003': // Ctrl+C
          terminal.write('^C');
          prompt(terminal);
          break;
        case '\r': // Enter
          runCommand(terminal, command);
          command = '';
          break;
        case '\u007F': // Backspace (DEL)
          // Do not delete the prompt
          if (terminal._core.buffer.x > 2) {
            terminal.write('\b \b');
            if (command.length > 0) {
              command = command.substr(0, command.length - 1);
            }
          }
          break;
        default: // Print all other characters for demo
          if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E) || e >= '\u00a0') {
            command += e;
            terminal.write(e);
          }
      }
    });
  }
  
  function prompt(term) {
    command = '';
    term.write('\r\n$ ');
  }
  
  var command = '';
  var commands = {
    help: {
      f: () => {
        terminal.writeln([
          'Welcome to xterm.js! Try some of the commands below.',
          '',
          ...Object.keys(commands).map(e => `  ${e.padEnd(10)} ${commands[e].description}`)
        ].join('\n\r'));
        prompt(terminal);
      },
      description: 'Prints this help message',
    },
    ls: {
      f: () => {
        terminal.writeln(['a', 'bunch', 'of', 'fake', 'files'].join('\r\n'));
        terminal.prompt(terminal);
      },
      description: 'Prints a fake directory structure'
    },
    loadtest: {
      f: () => {
        let testData = [];
        let byteCount = 0;
        for (let i = 0; i < 50; i++) {
          let count = 1 + Math.floor(Math.random() * 79);
          byteCount += count + 2;
          let data = new Uint8Array(count + 2);
          data[0] = 0x0A; // \n
          for (let i = 1; i < count + 1; i++) {
            data[i] = 0x61 + Math.floor(Math.random() * (0x7A - 0x61));
          }
          // End each line with \r so the cursor remains constant, this is what ls/tree do and improves
          // performance significantly due to the cursor DOM element not needing to change
          data[data.length - 1] = 0x0D; // \r
          testData.push(data);
        }
        let start = performance.now();
        for (let i = 0; i < 1024; i++) {
          for (const d of testData) {
            terminal.write(d);
          }
        }
        // Wait for all data to be parsed before evaluating time
        terminal.write('', () => {
          let time = Math.round(performance.now() - start);
          let mbs = ((byteCount / 1024) * (1 / (time / 1000))).toFixed(2);
          terminal.write(`\n\r\nWrote ${byteCount}kB in ${time}ms (${mbs}MB/s) using the ${isWebglEnabled ? 'webgl' : 'canvas'} renderer`);
          terminal.prompt();
        });
      },
      description: 'Simulate a lot of data coming from a process'
    }
  };
  
  function runCommand(term, text) {
    const command = text.trim().split(' ')[0];
    if (command.length > 0) {
      term.writeln('');
      if (command in commands) {
        commands[command].f();
        return;
      }
      term.writeln(`${command}: command not found`);
    }
    prompt(term);
  }
  
  runFakeTerminal();
}