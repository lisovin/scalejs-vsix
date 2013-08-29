// Guids.cs
// MUST match guids.h
using System;

namespace PeterLisovin.Scalejs_VSPackage
{
    static class GuidList
    {
        public const string guidScalejs_VSPackagePkgString = "11e506bf-4deb-45de-b152-b75afea691e3";
        public const string guidScalejs_VSPackageCmdSetString = "a60eb40e-fba2-4e34-a335-6d44b154c170";

        public static readonly Guid guidScalejs_VSPackageCmdSet = new Guid(guidScalejs_VSPackageCmdSetString);
    };
}