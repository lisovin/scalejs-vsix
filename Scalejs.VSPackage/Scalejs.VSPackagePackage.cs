using System;
using System.Diagnostics;
using System.Globalization;
using System.Runtime.InteropServices;
using System.ComponentModel.Design;
using System.IO;
using Microsoft.Win32;
using Microsoft.VisualStudio;
using Microsoft.VisualStudio.Shell.Interop;
using Microsoft.VisualStudio.OLE.Interop;
using Microsoft.VisualStudio.Shell;
using EnvDTE;
using EnvDTE80;
using System.Management.Automation.Runspaces;
using System.Management.Automation;

namespace PeterLisovin.Scalejs_VSPackage
{
    /// <summary>
    /// This is the class that implements the package exposed by this assembly.
    ///
    /// The minimum requirement for a class to be considered a valid package for Visual Studio
    /// is to implement the IVsPackage interface and register itself with the shell.
    /// This package uses the helper classes defined inside the Managed Package Framework (MPF)
    /// to do it: it derives from the Package class that provides the implementation of the 
    /// IVsPackage interface and uses the registration attributes defined in the framework to 
    /// register itself and its components with the shell.
    /// </summary>
    // This attribute tells the PkgDef creation utility (CreatePkgDef.exe) that this class is
    // a package.
    [PackageRegistration(UseManagedResourcesOnly = true)]
    [ProvideAutoLoad(VSConstants.UICONTEXT.SolutionExistsAndFullyLoaded_string)]
    // This attribute is used to register the information needed to show this package
    // in the Help/About dialog of Visual Studio.
    [InstalledProductRegistration("#110", "#112", "1.0", IconResourceID = 400)]
    [Guid(GuidList.guidScalejs_VSPackagePkgString)]
    public sealed class Scalejs_VSPackagePackage : Package
    {
        private bool subscribedToDte;
        private DTE2 dte;
        private Runspace runspace;

        /// <summary>
        /// Default constructor of the package.
        /// Inside this method you can place any initialization code that does not require 
        /// any Visual Studio service because at this point the package object is created but 
        /// not sited yet inside Visual Studio environment. The place to do all the other 
        /// initialization is the Initialize method.
        /// </summary>
        public Scalejs_VSPackagePackage()
        {
            Debug.WriteLine(string.Format(CultureInfo.CurrentCulture, "Entering constructor for: {0}", this.ToString()));
        }



        /////////////////////////////////////////////////////////////////////////////
        // Overridden Package Implementation
        #region Package Members

        /// <summary>
        /// Initialization of the package; this method is called right after the package is sited, so this is the place
        /// where you can put all the initialization code that rely on services provided by VisualStudio.
        /// </summary>
        protected override void Initialize()
        {
            this.dte = (DTE2)GetService(typeof(DTE));
            this.dte.Events.SolutionEvents.Opened += OnSolutionOpened;

            OnSolutionOpened();

            WriteLine("Scalejs is initialized");

            Debug.WriteLine (string.Format(CultureInfo.CurrentCulture, "Entering Initialize() of: {0}", this.ToString()));

            base.Initialize();

        }

        #endregion

        private void WriteLine(string message)
        {
            var outputWindow = this.dte.ToolWindows.OutputWindow;
            OutputWindowPane scalejsPane;

            try
            {
                scalejsPane = outputWindow.OutputWindowPanes.Item("Scalejs");
            }
            catch
            {
                scalejsPane = outputWindow.OutputWindowPanes.Add("Scalejs");
            }

            scalejsPane.OutputString(message + "\n");
        }

        private void OnSolutionOpened()
        {
            var path = Path.Combine(Path.GetDirectoryName((string)dte.Solution.Properties.Item("Path").Value), ".scalejs", "Scalejs.psd1");
            if (File.Exists(path))
            {
                OnScalejsSolutionOpened(path, dte);
            }
        }

        private void OnScalejsSolutionOpened(string path, DTE2 dte) {
            runspace = RunspaceFactory.CreateRunspace();
            runspace.Open();
            runspace.SessionStateProxy.SetVariable("dte", dte);

            //RunPowershell(ps => ps.AddCommand("Add-Type").AddParameter("AssemblyName", "EnvDTE80"));
            RunPowershell(ps => ps.AddCommand("Import-Module").AddArgument(path));
            RunPowershell(ps => ps.AddCommand("Register-ScalejsSolution"));

            this.dte.Events.SolutionEvents.AfterClosing += OnSolutionAfterClosing;
        }

        private void OnSolutionAfterClosing()
        {
            RunPowershell(ps => ps.AddCommand("Unregister-ScalejsSolution"));

            runspace.Dispose();

            this.dte.Events.SolutionEvents.AfterClosing -= OnSolutionAfterClosing;
        }

        private void RunPowershell(Func<PowerShell, PowerShell> addCommand)
        {
            try
            {
                using (var ps = PowerShell.Create())
                {
                    ps.Runspace = runspace;
                    var r = addCommand(ps).Invoke();
                    foreach (var error in ps.Streams.Error)
                    {
                        WriteLine(error.ToString());
                    }
                }
            }
            catch (Exception ex)
            {
                WriteLine("Failed to run powershell command. Exception:");
                WriteLine(ex.ToString());
            }
        }
    }
}
 