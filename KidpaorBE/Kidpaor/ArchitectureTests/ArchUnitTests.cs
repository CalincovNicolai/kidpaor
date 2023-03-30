using ArchUnitNET.Domain;
using ArchUnitNET.Loader;
using ArchUnitNET.xUnit;
using Microsoft.AspNetCore.Components;
using Xunit;
using static ArchUnitNET.Fluent.ArchRuleDefinition;

namespace Kidpaor.ArchitectureTests
{
    public class ArchUnitTests
    {
        private static readonly Architecture Architecture = new ArchLoader().LoadAssemblies(typeof(Program).Assembly).Build();

        [Fact]
        public void Controllers_ShouldNotBeAccessedBy_OtherLayers()
        {
            var controllers = Types().That().ResideInNamespace("Kidpaor.Controllers").As("controllers");

            var otherLayers = Types().That().AreNot(controllers);

            var rule = Classes().That().ResideInNamespace("Kidpaor.Controllers")
                .Should().NotDependOnAny(otherLayers).Because("Controllers should not be accessed by any other layer");

            rule.Check(Architecture);
        }
        
        [Fact]
        public void Services_ShouldBeAccessedOnlyBy_ControllersAndOtherServices()
        {
            var services = Types().That().ResideInNamespace("Infrastructure.Services").As("services");

            var allowedDependencies = Types().That()
                .ResideInNamespace("Kidpaor.Controllers")
                .Or()
                .ResideInNamespace("Infrastructure.Services")
                .As("allowed dependencies");

            var rule = Classes().That().ResideInNamespace("Infrastructure.Services")
                .Should().OnlyDependOn(allowedDependencies).Because("Services should be accessed only by controllers and other services");

            rule.Check(Architecture);
        }

        [Fact]
        public void Entities_ShouldBeAccessedOnlyBy_RepositoriesServicesAndConfigurationClasses()
        {
            var entities = Types().That().ResideInNamespace("Core.Entities").As("entities");

            var allowedDependencies = Types().That()
                .ResideInNamespace("Infrastructure.Data")
                .Or()
                .ResideInNamespace("Infrastructure.Services")
                .Or()
                .ResideInNamespace("Infrastructure.Data.Config")
                .As("allowed dependencies");

            var rule = Classes().That().ResideInNamespace("Core.Entities")
                .Should().OnlyDependOn(allowedDependencies).Because("Entities should be accessed only by repositories, services and configuration classes");

            rule.Check(Architecture);
        }

        [Fact]
        public void Repositories_ShouldBeAccessedOnlyBy_ServicesAndConfigurationClasses()
        {
            var repositories = Types().That().ResideInNamespace("Infrastructure.Data").As("repositories");

            var allowedDependencies = Types().That()
                .ResideInNamespace("Infrastructure.Services")
                .Or()
                .ResideInNamespace("Infrastructure.Data.Config")
                .As("allowed dependencies");

            var rule = Classes().That().ResideInNamespace("Infrastructure.Data")
                .Should().OnlyDependOn(allowedDependencies).Because("Repositories should be accessed only by services and configuration classes");

            rule.Check(Architecture);
        }
        
        [Fact]
        public void Classes_ShouldNotUseFieldInjection()
        {
            var classes = Types().That().AreNot("Interface").And().AreNotStructs();

            var rule = Classes().That().Are(classes).Should().NotBeAssignableTo(typeof(InjectAttribute))
                .Because("Classes should not use field injection");

            rule.Check(Architecture);
        }
        
        [Fact]
        public void No_Class_Should_Use_System_Out_Methods()
        {
            var classes = Classes().That().ResideInNamespace("Kidpaor").As("classes");

            var systemOutMethods = MethodMembers().That().AreDeclaredIn("System.Console")
                .And().HaveName("Write")
                .Or().HaveName("WriteLine");

            var rule = Classes().That().AreNot(classes)
                .Should().CallAny(systemOutMethods)
                .Because("No class in the project should use System.out methods");

            rule.Check(Architecture);
        }
    }
}
