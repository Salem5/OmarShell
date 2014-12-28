var myCommands;

var commandExecution = function (command, term) {
    var splittedCommand = command.split(" ");

    myCommands.callCommand(term, splittedCommand);
    //term.echo('you type command "' + command + '"');
    //term.resize();
    window.scrollTo(0, term.height());
}

var thisIsGreet = function (term,
     callback){    
    return "\
                           __________\n\
 dHHHHHHHHHb              //        /\n\
dHHHHHHHHHHHb            //        /\n\
HHHHH\" \"HHHHH           //    /\\   \\\n\
HHHH     HHHH          //    /_\\\\   \\\n\
HHHH     HHHH         //             \\\n\
HHHHH. .HHHHH        //     ______    \\\n\
\"HHHHHHHHHHH\"       //     /     \\\\    \\\n\
 \"HHHHHHHHH\"  <X>  //_____/       \\\\____\\\n\
\n\
Welcome to Omar Shell, I am Omar Ajerray and this is my little hackjob of an attempt to put out something unique as a website. The backend is still missing, and there are only a few supported commands, but feel free to play around.\n\
Find more about me online on my LinkedIn profile <http://uk.linkedin.com/in/omarajerray>\n\
This Terminal uses <http://terminal.jcubic.pl> And everything else I coded myself with a healty mix of JQuery, TypeScript and CSS.\n";
}

class AvailableCommand {
    command: String;
    action: (argument: String[], terminal: any) => boolean;
    
    constructor(argCommand: String, argAction: (argument: String[], terminal: any) => boolean) {
        this.command = argCommand;
        this.action = argAction;
    }
}

class CommandCollection {
    commands: Array<AvailableCommand> = new Array<AvailableCommand>();

    addCommand(commandToAdd: AvailableCommand) {
        this.commands.push(commandToAdd);
    }

    callCommand(terminal: any, calledCommand: String[]): boolean {
        var result = false;

        this.commands.forEach(function (vc) {
            if (vc.command == calledCommand[0]) {
                calledCommand.shift();
                vc.action(calledCommand, terminal);
                result = true;
            }
        }, this);

        if (!result) {
            terminal.echo("command \"" + calledCommand[0] + "\" wasn't found, try \"help\" to see which commands with what kind of arguments are supported right now.\n");
            return false;
        }
        return result;
    }    
}

window.onload = () => {
    myCommands = new CommandCollection();
    //about command for intro.
    myCommands.addCommand(new AvailableCommand("about", function (argument,terminal) : boolean {
        terminal.greetings();
        return true;
    }));
    //help command which shows available commands.
    myCommands.addCommand(new AvailableCommand("help", function (argument, terminal): boolean {
        terminal.echo(
            "help - shows this help screen.\n" +
            "about - shows the intro information.\n" +
            "clear - clears the terminal of its history\n" +
            "echo - (experimental) returns the arguments to the terminal."
            );
        return true;
    }));
    //help command which shows available commands.
    myCommands.addCommand(new AvailableCommand("echo", function (argument, terminal): boolean {
        terminal.echo(argument);
        return true;
    }));
};